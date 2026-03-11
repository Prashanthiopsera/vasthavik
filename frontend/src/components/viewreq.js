import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Navbar/Sidebar';
import '../App.css';
import '../index.css';
import stuImage from '../assets/test10.jpeg';

const Viewreq = () => {
    const [Certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch certificate data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/get_allcerti'); // API endpoint to get all certificates
                setCertificates(response.data); // Set the certificate data in state
                setLoading(false); // Data is loaded
            } catch (err) {
                setError(err.message); // Handle any errors
                setLoading(false); // Stop loading if there's an error
            }
        };

        fetchData();
    }, []);

    // Handle input change for each certificate
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCertificates = [...Certificates];
        updatedCertificates[index][name] = value;  // Update grade or status in the state
        setCertificates(updatedCertificates);
    };

    // Handle submit to update the certificate
    const handleUpdate = async (certificateId, index) => {
        const updatedCertificate = Certificates[index];

        try {
            await axios.put(`http://localhost:5001/update_certi/${certificateId}`, { 
                grade: updatedCertificate.grade,
                status: updatedCertificate.status
            });
            alert('Certificate updated successfully');
        } catch (error) {
            console.error('There was an error updating the certificate!', error);
            alert('Failed to update the certificate');
        }
    };

    // Render the table or error/loading message
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
            <div className="table-container">
                <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Certificate Records</h2>
                {loading ? (
                    <p>Loading certificate data...</p>
                ) : error ? (
                    <p>Error fetching data: {error}</p>
                ) : (
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Certificate ID</th>
                                <th>Student ID</th>
                                <th>Program</th>
                                <th>Grade</th>
                                <th>Request Date</th>
                                <th>Issued Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Certificates.map((Certificate, index) => (
                                <tr key={Certificate.certi_id}>
                                    <td>{Certificate.certi_id}</td>
                                    <td>{Certificate.stud_id}</td>
                                    <td>{Certificate.program}</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="grade" 
                                            value={Certificate.grade} 
                                            onChange={(e) => handleInputChange(e, index)} 
                                        />
                                    </td>
                                    <td>{Certificate.request_date ? new Date(Certificate.request_date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{Certificate.issued_date ? new Date(Certificate.issued_date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{Certificate.reason}</td>
                                    <td>
                                        <select 
                                            name="status" 
                                            value={Certificate.status} 
                                            onChange={(e) => handleInputChange(e, index)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Issued">Issued</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(Certificate.certi_id, index)}>
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            </div>
        </>
    );
};

export default Viewreq;
