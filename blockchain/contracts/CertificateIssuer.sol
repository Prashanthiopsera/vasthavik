// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateIssuer {
    struct Certificate {
        uint256 studentId;
        string grade;
        string program;
        address issuer;
    }

    mapping(uint256 => Certificate) public certificates;
    uint256[] public studentIds;

    event CertificateIssued(
        uint256 indexed studentId,
        string grade,
        string program,
        address indexed issuer
    );

    function issueCertificate(uint256 _studentId, string memory _grade, string memory _program) public {
        certificates[_studentId] = Certificate(_studentId, _grade, _program, msg.sender);
        studentIds.push(_studentId);
        emit CertificateIssued(_studentId, _grade, _program, msg.sender);
    }

    function getCertificate(uint256 _studentId) public view returns (
    uint256 studentId,
    string memory grade,
    string memory program,
    address issuer
) {
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

}
