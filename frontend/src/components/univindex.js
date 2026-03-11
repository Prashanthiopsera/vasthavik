import * as React from 'react';
import { ImageListItem, ImageList, Typography } from '@mui/material';
import Navbar from './Navbar/Navbar'
import univImage from './assets_components/univ2.png';
import stud from './assets_components/stude.png';
import certi from './assets_components/certi.png';
import req from './assets_components/requ.png';
import viewstu from './assets_components/viewstude.png';
import { useNavigate } from "react-router-dom";
import Sidebar from './Navbar/Sidebar';
import gsuImage from '../assets/test10.jpeg'; // Import the image


export default function () {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("loginData"));
    return (
        <>

            <div
    style={{
        backgroundImage: `url(${gsuImage})`,
        backgroundSize: 'cover', // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent tiling of the image
        height: '100vh', // Set height to the full viewport
        width: '100vw', // Set width to the full viewport
    }}
>
<Sidebar />
            <div className='page' >
                <h2>{`Welcome ${userData.name},`}</h2>
                <div className='row'>
                    <div className='block'>
                        <div className='blkimg' style={{ backgroundImage: `url(${stud})`, cursor: 'pointer' }}onClick={() => navigate('/Addstud')}></div>
                        <text> Add new student</text>
                    </div>
                    <div className='block'>
                        <div className='certiimg' style={{ backgroundImage: `url(${certi})`,cursor: 'pointer' }}onClick={() => navigate('/issuecerti')}></div>
                        <text> Issue Certificates</text>
                    </div>

                </div>
                <div className='row'>
                    <div className='block'>
                        <div className='blkimg' style={{ backgroundImage: `url(${viewstu})`, cursor: 'pointer' }}onClick={() => navigate('/viewstud')}>
                        </div>
                        <text> View All Students</text>
                    </div>
                    <div className='block'>
                        <div className='reqimg' style={{ backgroundImage: `url(${req})`,cursor: 'pointer' }}onClick={() => navigate('/viewreq')}></div>
                        <text> View All Requests</text>
                    </div>
                </div>
                <div className='row'>
                    <div className='block'>
                        <div className='reqimg' style={{ backgroundImage: `url(${req})`,cursor: 'pointer' }}onClick={() => navigate('/verifycerti')}></div>
                        <text> View All Certificates</text>
                    </div>
                </div>

            </div>
            </div>
        </>
    )
}