const ContractABI = [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "studentId",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "grade",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "program",
              "type": "string"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "issuer",
              "type": "address"
          }
      ],
      "name": "CertificateIssued",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "certificates",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "studentId",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "grade",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "program",
              "type": "string"
          },
          {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_studentId",
              "type": "uint256"
          }
      ],
      "name": "getCertificate",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "studentId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "grade",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "program",
                      "type": "string"
                  },
                  {
                      "internalType": "address",
                      "name": "issuer",
                      "type": "address"
                  }
              ],
              "internalType": "struct CertificateIssuer.Certificate",
              "name": "",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_studentId",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "_grade",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "_program",
              "type": "string"
          }
      ],
      "name": "issueCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getAllCertificates",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          },
          {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
          },
          {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
          },
          {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];

export default { abi: ContractABI };
