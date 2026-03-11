import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png';
import univImage from './assets_components/univ2.png';
import gsu from './assets_components/gsu.png';
import gsuImage from './assets_components/univ.jpg'; // Import the image

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const logInUser = () => {
        setError(false);
        if (username.length === 0) {
            alert("Username has left Blank!");
        }
        else if (password.length === 0) {
            alert("Password has left Blank!");
        }
        else {
            axios.post('http://localhost:5001/post_univ', { username, password })
                .then(response => {
                    if (response) {
                        localStorage.setItem("loginData", JSON.stringify(response.data))
                        navigate('/univindex');
                    }
                }).catch((e) => {
                    console.log("error: ", e);
                    setError(true);
                });
        };
    };

    return (
        <>
            <div
                className='university'
                style={{
                    backgroundImage: `url(${gsuImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    position: 'relative',
                }}
            >
                {/* Purple Transparent Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        //backgroundColor: 'rgba(50, 22, 138, 0.69)', // Purple with transparency
                        zIndex: 0,
                    }}
                ></div>

                <div className='index' style={{ position: 'relative', zIndex: 1 }}>
                    <div className='univnavbar'>
                        <img src={logo} alt="" className='logo' />
                        <span className='logo-text' style={{ fontSize: '40px', fontWeight: 'bold' }}>Vastavik</span>
                        <ul className="nav-items">
                            <li onClick={() => navigate("/university")} >University</li>
                            <li onClick={() => navigate("/student")} >Student</li>
                            <li onClick={() => navigate("/employee")} >Recruiter</li>
                        </ul>
                    </div>
                    <div className='login-section' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                        <div style={{ textAlign: 'center' }}> <img src={gsu} alt="Contact" style={{ width: '70%', height: '50%', marginTop: '17%' }} /> </div>

                    <div className='uni'>
                        <div className='univbox'>
                            <div
                                className='login'
                                style={{
                                    backgroundImage: `url(${univImage})`,
                                    position: 'relative',
                                    left: '39%',
                                    top: '-5px',
                                    zIndex: 1,
                                    padding: '5px',
                                    width: '100px',
                                    height: '100px',
                                    backgroundSize: 'cover'
                                }}
                            ></div>
                            <div className='loginModal' style={{ marginBottom: '20px' }}>
                                <div>
                                    <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => { setUsername(e.target.value); }} style={{ marginBottom: '20px' }} />
                                </div>
                                <div>
                                    <TextField id="outlined-basic" type="Password" variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                                </div>
                                {error && <Typography sx={{ color: "red" }}>Invalid Username Password</Typography>}
                                <button type="submit" className="cta-button" onClick={logInUser} style={{ marginTop: '20px' }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        </>
    )
}
