import Navbar from './Navbar/Navbar'
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import univImage from './assets_components/emp.png'; // Import the image
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png'



export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // function checkLogin() {

    //     let respose = app.get('http://localhost:5001/get_univ/{}');

    //     if (Response.statusCode === 200) {
    //         // send to next page
    //     } else {
    //         //  show alert message saying wrong credentials.
    //     }

    // }
    const logInUser = () => {
        setError('');
        if (username.length === 0) {
            alert("Username has left Blank!");
        }
        else if (password.length === 0) {
            alert("Password has left Blank!");
        }
        else {
            axios.post('http://localhost:5001/post_univ', { username, password })
                .then(response => {
                    // alert(response)
                    if (response.status === 200) {
                        alert("successful")
                        // window.location.href = '/emplogin'; // Redirect to emplogin page
                    } else {
                        setError('Invalid credentials'); // Show error if login fails
                    }
                });
        };
    };

    return (

        <>
            <div className='university'>
            <div className='index'>
                <div className='univnavbar'>
                    <img src={logo} alt="" className='logo' />
                    <span className='logo-text' style={{ fontSize: '40px', fontWeight: 'bold' }}>Vastavik</span>
                    <ul class="nav-items">
                        <li onClick={() => navigate("/university")} >University</li>
                        <li onClick={() => navigate("/student")} >Student</li>
                        <li onClick={() => navigate("/employee")} >Recruiter</li>
                    </ul>
                </div>
            <div className='uni'>
                <div className='univbox'>
                    <div className='loginModal'>
                        <div>

                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className='univbox'>
                <div className='login'     style={{ 
        backgroundImage: `url(${univImage})`, 
        position: 'relative', 
        left: '40%', 
        marginBottom: '18px',
        top: '8px', 
        zIndex: 1, 
        padding: '5px', 
        width: '85px', 
        height: '85px', 
        backgroundSize: 'cover'
    }}
></div>
                <div className='loginModal'>
                        <div>
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => { setUsername(e.target.value); }} style={{ marginBottom: '20px', }} />

                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                        </div>
                        <button type="submit" className="submitButton" onClick={logInUser} style={{ marginTop: '20px' }}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>

    )
}