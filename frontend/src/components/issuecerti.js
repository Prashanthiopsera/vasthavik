import Sidebar from './Navbar/Sidebar';
import stuImage from '../assets/test10.jpeg';
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import ContractABI from '../contractabi/contractabi.js';

const checkEthers = () => {
    console.log('Ethers.js version:', ethers.version); // This will log the version of ethers
};

checkEthers();


const Issuecerti = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        grade: '',
        stud_id: '',
        program: ''
    });

    const [signer, setSigner] = useState(null); // Initialize signer state
    const [contract, setContract] = useState(null); // Initialize contract state
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can send data to your API (e.g., using fetch or axios)
        // Example:
        try {
            if (!contract) {
                throw new Error("Contract is not connected.");
            }

            // Interact with the smart contract
            const tx = await contract.issueCertificate(formData.stud_id, formData.grade, formData.program);
            await tx.wait(); // Wait for the transaction to be mined
            console.log('Transaction:', tx);

            // Send data to your API
            const response = await axios.post('http://localhost:5001/issue_certificate', formData);
            console.log(response.data);
            console.log('Form Data Submitted:', formData);
            alert("Certificate Issued");
            // Redirect to another page after successful issuance
        } catch (error) {
            console.error('Error issuing certificate:', error);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${stuImage})`, backgroundSize: 'cover', backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    minHeight: '100vh', // Ensure the background covers the full height of the viewport
                    margin: 0,           // Remove any default margins
                    padding: 0,
                }}
            >
                <Sidebar />

                <div style={styles.container}>
                    <h2 style={styles.heading}>Issue Certificate</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {/* Input field for Student ID */}
                        <label htmlFor="stud_id" style={styles.label}>Student ID</label>

                        <input
                            type="number"
                            id="stud_id"
                            name="stud_id"
                            value={formData.stud_id}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter Student ID"
                            required
                        />
                        <label htmlFor="program" style={styles.label}>Program</label>
                        <input
                            type="text"
                            id="program"
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter Program"
                            required
                        />
                        {/* Input field for Grade */}
                        <label htmlFor="grade" style={styles.label}>Grade</label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter grade (e.g., A, B+, C)"
                            required
                        />


                        {/* Submit button */}
                        <button type="submit" style={styles.button}>
                            Issue Certificate
                        </button>
                    </form>
                </div>
            </div>
        </>
    );

};

// Define some basic styles for the form
const styles = {
    container: {
        maxWidth: '500px',
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#2565AE',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    }
};

export default Issuecerti;
