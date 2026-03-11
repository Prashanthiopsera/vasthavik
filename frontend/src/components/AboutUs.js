// Filename - pages/AboutUs.js

import React from "react";
import bkg2 from '../assets/test7.jpg';


const AboutUs = () => {
    return (
            <div id="about" className='bkg2' style={{ backgroundImage: `url(${bkg2})`, backgroundSize: 'cover', height: '100vh'  }}>
        <div className="box" >
        <div className="about-section" >
            <h1>About Us</h1>
            <p style={{ color: '#ffffff' }}>At Vastavik, I aim to redefine trust and transparency in the certification process through blockchain technology. My platform simplifies certificate issuance and verification, ensuring security, authenticity, and accessibility for all stakeholders. By leveraging decentralized and tamper-proof solutions, I eliminate fraud and build confidence in academic and professional achievements. 
                Whether you're an institution, a student, or an employer, my innovative approach guarantees seamless, efficient, and trustworthy certification management.</p>
            <p style={{color:'#ffffff'}}>With Vastavik, the future of certification is not only secure but also user-friendly. My blockchain-powered solution allows institutions to issue credentials instantly, while individuals can access and share their certificates with ease, anytime and anywhere. Employers benefit from quick and reliable verification, streamlining their hiring processes and ensuring they onboard only the most qualified candidates.</p></div>
            </div>
            </div>
    );
};




// Default export for AboutUs
export default AboutUs;

// Named exports for the other components

