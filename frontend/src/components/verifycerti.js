import Sidebar from './Navbar/Sidebar';
import stuImage from '../assets/test10.jpeg';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import ContractABI from '../contractabi/contractabi.js';

const VerifyCerti = () => {
    const [certificates, setCertificates] = useState([]);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null); 

const connectContract = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum); // Connect to Metamask
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner(); // Ensure signer is correctly initialized
                const contractAddress = '0x903437682ee988835aec61Fe306585F6f272C8cb'; // Your contract address
                const contract = new ethers.Contract(contractAddress, ContractABI.abi, signer);

                setSigner(signer);
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

    // Fetch all certificates
    const fetchAllCertificates = async () => {
        try {
            if (!contract) {
                throw new Error("Contract is not connected.");
            }

            const [ids, grades, programs, issuers] = await contract.getAllCertificates();
            const allCertificates = ids.map((id, index) => ({
                studentId: id.toString(),
                grade: grades[index],
                program: programs[index],
                issuer: issuers[index],
            }));

            setCertificates(allCertificates);
            console.log('All Certificates:', allCertificates);
        } catch (error) {
            console.error('Error fetching certificates:', error);
            alert('Error fetching certificates: ' + error.message);
        }
    };

    useEffect(() => {
        fetchAllCertificates();
    }, [contract]); // Fetch certificates when contract is connected

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

                <div style={styles.container}>
                    <h2 style={styles.heading}>All Certificates</h2>

                    {certificates.length > 0 ? (
                        <div>
                            {certificates.map((cert, index) => (
                                <div key={index} style={styles.result}>
                                    <p><strong>Student ID:</strong> {cert.studentId}</p>
                                    <p><strong>Grade:</strong> {cert.grade}</p>
                                    <p><strong>Program:</strong> {cert.program}</p>
                                    <p><strong>Issuer:</strong> {cert.issuer}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No certificates found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

// Define some basic styles for the component
const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    result: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f1f1f1',
    }
};

export default VerifyCerti;
