import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Navbar/Sidebar';
import '../App.css';
import '../index.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import stuImage from '../assets/test10.jpeg';
import { Typography } from '@mui/material';

const Viewstud = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pagination = true;
    const paginationPageSize = 500;
    const paginationPageSizeSelector = [200, 500, 1000];

    const [colDefs] = useState([
        { headerName: "Student ID", field: "stud_id", filter: true },
        { headerName: "First Name", field: "firstName", filter: true },
        { headerName: "Last Name", field: "lastName", filter: true },
        { headerName: "Username", field: "username", filter: true },
        { headerName: "Email", field: "email", filter: true },
        { headerName: "Date of Birth", field: "dob", filter: true },
        { headerName: "Program", field: "program", filter: true },
        { headerName: "Start Date", field: "startDate", filter: true },
        { headerName: "Enrollment Status", field: "entStatus", filter: true }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/student_all');
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <div >
                    <Sidebar />
                    <h2 style={{ textAlign: 'center' }}>Student Records</h2>
                    {loading ? (
                        <p>Loading student data...</p>
                    ) : error ? (
                        <p>Error fetching data: {error}</p>
                    ) : (
                        <div
                        className="ag-theme-quartz"
                        style={{
                            height: 400,                // Set the grid height
                            width: '80%',               // Adjust width to make it more compact
                            margin: '0 auto',           // Center the grid
                            marginTop: '5%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent white background
                            padding: '10px',            // Add padding around grid
  
                        }}
                    >

                            <AgGridReact
                                rowData={students}
                                columnDefs={colDefs}
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Viewstud;
