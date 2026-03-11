import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png';
import bkg2 from '../assets/test7.jpg';
import bkg from '../assets/test7.jpg';
import contact from '../assets/contact.png';
import AboutUs from './AboutUs.js';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const Main = () => {
    const navigate = useNavigate();

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToMain = () => {
        const contactSection = document.getElementById('Maincontent');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };



    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${bkg})` }}>
                <div className='navbar'>
                    <img src={logo} alt="" className='logo' />
                    <span className='logo-text'>Vastavik</span>
                    <ul className="nav-items">
                        <li onClick={scrollToMain}>Main</li>
                        <li onClick={scrollToAbout}>About Us</li>
                        <li onClick={scrollToContact}>Contact</li>
                    </ul>
                </div>
                <div>
                    <div className="hero-section">
                        <div className="hero-overlay">
                            <h1 className="hero-title">Blockchain-Powered Certificate Verification</h1>
                            <p className="hero-subtitle">Issue, Verify, and Secure Your Certificates Seamlessly</p>
                            <div className="hero-buttons">
                                <button className="cta-button" onClick={() => navigate("/university")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="about">
                <AboutUs />
            </div>
            <div id="contact">
                <div id="about" className='bkg2' style={{ backgroundImage: `url(${bkg2})`, backgroundSize: 'cover', height: '100vh' }}>

                    <div className="boxcontact">
                    <h1 style={{ marginTop: '10px'}}>Contact</h1>
                    <div className="contact-section" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                
                            <Box display="flex" flexDirection="column" justifyContent="center" padding={10}>

                                <Box
                                
                                    display="flex"
                                    alignItems="center"
                                    marginRight={5}
                                    sx={{
                                        marginTop: '10px',
                                        backgroundColor: 'darkblue',
                                        borderRadius: '8px',
                                    
                                    }} // Add styles for the dark blue background
                                >
                                    <MailOutlineIcon color="primary" fontSize="large" />
                                    <Typography variant="body1" style={{ color: '#ffffff'}}>
                                        prashanthik@gmail.com
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    marginRight={5}
                                    sx={{
                                        marginTop: '10px',
                                        backgroundColor: 'darkblue',
                                        borderRadius: '8px',
                               
                                    }} // Add styles for the dark blue background
                                >
                                    <PhoneIcon color="primary" fontSize="large" />
                                    <Typography variant="body1" style={{ color: '#ffffff'}}>
                                        (919) 633-6405
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    marginRight={20}
                                    sx={{
                                         marginTop: '10px',
                                        backgroundColor: 'darkblue',
                                        borderRadius: '8px',
                               
                                    }} // Add styles for the dark blue background
                                >
                                    <LocationOnIcon color="primary" fontSize="large" />
                                    <Typography variant="body1" style={{ color: '#ffffff'}}>
                                        Atlanta, Georgia
                                    </Typography>
                                </Box>
                            </Box>
                            <div style={{ textAlign: 'center' }}>
    <img src={contact} alt="Contact" style={{ width: '50%', height: '50%' }} />
</div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Main;
