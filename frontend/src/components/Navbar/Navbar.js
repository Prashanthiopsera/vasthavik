import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo2.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate();
const [id, setId] = useState("");

  return (
    <div>
    <div className='navbar'>
        <img src={logo} alt="" className='logo'/> 
        <span className='logo-text' style={{ fontSize: '40px', fontWeight: 'bold' }}>Vastavik</span>
        <ul class="nav-items">
            <li onClick={()=> navigate("/university")} >University</li>
            <li onClick={()=> navigate("/student")} >Student</li>
            <li onClick={()=> navigate("/employee")} >Recruiter</li>
        </ul>
    </div>
    </div>

  )
}

export default Navbar



