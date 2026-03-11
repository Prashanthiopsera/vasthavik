import Sidebar from './Navbar/Sidebar';
import stuImage from './assets_components/admin.avif';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import ContractABI from '/Users/prashanthireddy/Desktop/Project/code/vastavik/frontend/src/contractabi/contractabi.js';

const VerifyCerti = () => {
    const [studentId, setStudentId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [contract, setContract] = useState(null);

    const connectContract = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum); // Connect to MetaMask
                const signer = provider.getSigner(); // Get the signer
                const contractAddress = '0xA09d1134F843bBC961CcaEce0a9D84f7e21A2538'; // Your contract address
                const contract = new ethers.Contract(contractAddress, ContractABI.abi, signer);

                setContract(contract);
                console.log('Contract connected:', contract);
            } else {
                alert("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Error connecting to contract:", error);
        }
    };

    useEffect(() => {
        connectContract();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setStudentId(e.target.value);
    };

    // Verify certificate
    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            if (!contract) {
                throw new Error("Contract is not connected.");
            }

            // Call the getCertificate function from the smart contract
            const result = await contract.getCertificate(studentId); // Use studentId

            // Log the raw result for debugging
            console.log('Raw result from contract:', result);

            // Create a verificationData object from the result
            const verificationData = {
                studentId: result.studentId.toString(),
                grade: result.grade,
                program: result.program,
                issuer: result.issuer,
            };

            // Set the verification result
            setVerificationResult(verificationData);
            console.log('Verification Result:', verificationData);
        } catch (error) {
            console.error('Error verifying certificate:', error);
            alert('Error verifying certificate: ' + error.message);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${stuImage})`, 
                    backgroundSize: 'cover', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Sidebar />

                <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Verify Certificate</h2>
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="studentId" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Student ID</label>
                        <input
                            type="number"
                            id="studentId"
                            value={studentId}
                            onChange={handleChange}
                            style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', fontSize: '16px' }}
                            placeholder="Enter Student ID"
                            required
                        />
                        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#2565AE', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
                            Verify Certificate
                        </button>
                    </form>

                    {verificationResult && (
                        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f1f1f1' }}>
                            <h3>Verification Result:</h3>
                            <p><strong>Student ID:</strong> {verificationResult.studentId}</p>
                            <p><strong>Grade:</strong> {verificationResult.grade}</p>
                            <p><strong>Program:</strong> {verificationResult.program}</p>
                            <p><strong>Issuer:</strong> {verificationResult.issuer}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerifyCerti;
