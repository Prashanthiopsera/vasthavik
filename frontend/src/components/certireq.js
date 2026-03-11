import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Sidebarstu from "./Navbar/sidebarstu";
import axios from 'axios';
import gsuImage from '../assets/test10.jpeg';


const Certireq = () => {
    const studentData = JSON.parse(localStorage.getItem("studata"));
    const [formData, setFormData] = useState({
        stud_id: studentData ? studentData.stud_id : "",
        univ_id: studentData ? studentData.univ_id : "",
        program: studentData ? studentData.program : "",  // Set initial program value from local storage
        reason: ""
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.reason) {  // Check only for reason since program is read-only
            setError('Reason is required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/request_certificate', {
                stud_id: formData.stud_id,
                univ_id: formData.univ_id,
                program: formData.program,  // Send program in request
                reason: formData.reason
            });
            console.log("Response Data: ", response.data);
            setSuccessMessage('Certificate request submitted successfully!');
            setFormData({
                stud_id: studentData ? studentData.stud_id : "",
                univ_id: studentData ? studentData.univ_id : "",
                program: studentData ? studentData.program : "",  // Reset program
                reason: ""
            });
        } catch (error) {
            console.error("There was an error submitting the request!", error);
            setError("Failed to submit the request.");
        }
    };

    return (
        <>
        <div     style={{
                backgroundImage: `url(${gsuImage})`,
                backgroundSize: 'cover', // Ensure the image covers the entire area
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent tiling of the image
                height: '100vh', // Set height to the full viewport
                width: '100vw', // Set width to the full viewport
            }}>
             <Sidebarstu />
            <div className='certificate-request-container' style={{ color:'white' }}>
                <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Request a Certificate</h2>

                <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', color:'white'}}>

<TextField
    label="Program"
    name="program"
    variant="outlined"
    value={formData.program}
    InputProps={{
        readOnly: true,  // Make the input read-only
        style: { color: 'white' },  // Set font color to white
        sx: { 
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white when focused
            },
        }
    }}
    InputLabelProps={{
        style: { color: 'white' }  // Set label color to white
    }}
    fullWidth
    style={{ marginBottom: '20px' }}
/>

<TextField
    label="Reason for Request"
    name="reason" 
    variant="outlined"
    value={formData.reason}
    onChange={handleChange} 
    fullWidth
    multiline
    rows={4}
    InputProps={{
        style: { color: 'white' }, // Set font color to white
        sx: { 
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set border color to white when focused
            },
        }
    }}
    InputLabelProps={{
        style: { color: 'white' }  // Set label color to white
    }}
    style={{ marginBottom: '20px' }}
/>


                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'white' }}>{successMessage}</p>}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit Request
                    </Button>
                </form>
            </div>
            </div>
        </>
    );
};

export default Certireq;
