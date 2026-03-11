import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contractabi/contractabi.js';

const CertificateIssuer = () => {
    const [certificateId, setCertificateId] = useState('');
    const [recipient, setRecipient] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [certificateData, setCertificateData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Replace with your contract address
    const contractAddress = '0xYourContractAddress'; 

    const issueCertificate = async () => {
        try {
            // Connect to MetaMask
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Issue the certificate (replace with your function parameters)
            const txResponse = await contract.issueCertificate(recipient); // Example function call
            setTransactionHash(txResponse.hash);

            // Wait for the transaction to be mined
            const txReceipt = await provider.getTransactionReceipt(txResponse.hash);
            if (txReceipt && txReceipt.status === 1) {
                console.log("Certificate issued successfully!");
            } else {
                throw new Error("Transaction failed!");
            }
        } catch (error) {
            console.error("Error issuing certificate:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchCertificateData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            
            // Fetch the certificate data using the certificateId
            const data = await contract.getCertificate(certificateId); // Replace with your function
            setCertificateData(data);
        } catch (error) {
            console.error("Error fetching certificate data:", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Issue Certificate</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <button onClick={issueCertificate}>Issue Certificate</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            
            <h2>Check Certificate</h2>
            <input
                type="text"
                placeholder="Certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
            />
            <button onClick={fetchCertificateData}>Fetch Certificate</button>
            
            {certificateData && (
                <div>
                    <h3>Certificate Data:</h3>
                    <p>{JSON.stringify(certificateData)}</p>
                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default CertificateIssuer;
