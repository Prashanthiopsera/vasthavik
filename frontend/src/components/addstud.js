import React, { useState } from 'react';
import Sidebar from "./Navbar/Sidebar";
import "../App.css";
import "../index.css";
import axios from "axios";
import stuImage from '../assets/test10.jpeg';
import gsuImage from '../assets/test10.jpeg';

import {
    AboutUs,
    OurAim,
    OurVision,
} from "./AboutUs";

const Addstud = () => {
    // State to store form data
    const userData = JSON.parse(localStorage.getItem("loginData"));
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        dob: "",
        program: "",
        startDate: "",
        entStatus: "",
        univ_id: userData ? userData.univ_id : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            // Sending data to the API using axios POST request


            const response = await axios.post("http://localhost:5001/post_addstud", formData);
            console.log("Response Data: ", response.data);

            // Handle successful submission, e.g., show a message or clear form
            alert("Student data submitted successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                dob: "",
                program: "",
                startDate: "",
                entStatus: "",
                univ_id: userData ? userData.univ_id : "" 
            });

        } catch (error) {
            // Handle errors
            console.error("There was an error submitting the form!", error);
            alert("Failed to submit student data.");
        }
    };
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
            <div className="form-container">
                <div className="form-box">
                <h2 style={{ 
    textAlign: "center", 
    marginTop: "20px",   // Space above the heading
    marginBottom: "20px" // Space below the heading, adding space to the next div
}}>
    Student Details Form
</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name: </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name: </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth: </label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Program: </label>
                            <input
                                type="text"
                                name="program"
                                value={formData.program}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Start Date: </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Enrollment Status: </label>
                            <select
                                name="entStatus"
                                value={formData.entStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select status</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Graduated">Graduated</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    <button type="submit" className="cta-button">Create Student Account</button>
</div>

                    </form>
                </div>
            </div>
            </div>
        </>
    );
};

export default Addstud;
