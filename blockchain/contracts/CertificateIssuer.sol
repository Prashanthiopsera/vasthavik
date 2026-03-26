// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateIssuer {
    struct Certificate {
        uint256 studentId;
        string grade;
        string program;
        address issuer;
    }

    address public owner;
    mapping(address => bool) public authorizedIssuers;

    mapping(uint256 => Certificate) public certificates;
    uint256[] public studentIds;
    mapping(uint256 => bool) private _certificateExists;

    event CertificateIssued(
        uint256 indexed studentId,
        string grade,
        string program,
        address indexed issuer
    );
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "CertificateIssuer: caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedIssuers[msg.sender],
            "CertificateIssuer: caller is not authorized"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function authorizeIssuer(address _issuer) external onlyOwner {
        require(_issuer != address(0), "CertificateIssuer: zero address not allowed");
        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer);
    }

    function revokeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "CertificateIssuer: zero address not allowed");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function issueCertificate(
        uint256 _studentId,
        string memory _grade,
        string memory _program
    ) public onlyAuthorized {
        require(_studentId != 0, "CertificateIssuer: invalid student ID");
        require(bytes(_grade).length > 0, "CertificateIssuer: grade cannot be empty");
        require(bytes(_program).length > 0, "CertificateIssuer: program cannot be empty");
        require(!_certificateExists[_studentId], "CertificateIssuer: certificate already exists for this student");

        certificates[_studentId] = Certificate(_studentId, _grade, _program, msg.sender);
        _certificateExists[_studentId] = true;
        studentIds.push(_studentId);

        emit CertificateIssued(_studentId, _grade, _program, msg.sender);
    }

    function getCertificate(uint256 _studentId) public view returns (
        uint256 studentId,
        string memory grade,
        string memory program,
        address issuer
    ) {
        require(_certificateExists[_studentId], "CertificateIssuer: certificate does not exist");
        Certificate memory cert = certificates[_studentId];
        return (cert.studentId, cert.grade, cert.program, cert.issuer);
    }

    function getAllCertificates() public view returns (
        uint256[] memory ids,
        string[] memory grades,
        string[] memory programs,
        address[] memory issuers
    ) {
        uint256 length = studentIds.length;
        ids = new uint256[](length);
        grades = new string[](length);
        programs = new string[](length);
        issuers = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 id = studentIds[i];
            Certificate memory cert = certificates[id];
            ids[i] = cert.studentId;
            grades[i] = cert.grade;
            programs[i] = cert.program;
            issuers[i] = cert.issuer;
        }

        return (ids, grades, programs, issuers);
    }

    function certificateCount() external view returns (uint256) {
        return studentIds.length;
    }
}
