import Navbar from './Navbar/Navbar'
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import stud from './assets_components/stud.png';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png'
import stuImage from './assets_components/student3.jpeg';  // Import the image

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
        setError(false);
        if (username.length === 0) {
            alert("Username has left Blank!");
        }
        else if (password.length === 0) {
            alert("Password has left Blank!");
        }
        else {
            axios.post('http://localhost:5001/post_stud', { username, password })
                .then(response => {
                    // alert(response)
                    if (response.status === 200) {
                        localStorage.setItem("studata",JSON.stringify(response.data))
                        navigate('/studindex');
                    }
                }).catch((e) => {
                    console.log("error: ",e);
                    setError(true);
                });
        };
    };

    return (

        <>
            <div className='university' style={{ backgroundImage: `url(${stuImage})` }}>  {/* Use the imported image */}
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
                    <div
                        className='login'
                        style={{
                            backgroundImage: `url(${stud})`,
                            position: 'relative',
                            left: '36%',
                            top: '0px',
                            zIndex: 1,
                            padding: '5px',
                            width: '123px',
                            height: '94px',
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
                        {error && <Typography sx={{color: "red"}}>Invalid Username Password</Typography>}
                        <button type="submit" className="cta-button" onClick={logInUser} style={{ marginTop: '20px' }}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>

    )
}