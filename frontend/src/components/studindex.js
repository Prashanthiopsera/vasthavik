import Navstud from './Navbar/navstud'
import React from 'react';
import './Dashboard.css'; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import gsuImage from '../assets/test10.jpeg'; 


const Studindex = () => {
        const stuData = JSON.parse(localStorage.getItem("studata"));
            const navigate = useNavigate();
        const totalPayable = 10000;
        const totalPaid = 5000;
        const others = 300;
        const enrolledCourses = [
            "Object Oriented Programming",
            "Fundamentals of Database Systems"
        ];

        const handleLogout = () => {
            localStorage.removeItem("loginData");
            localStorage.removeItem("studata"); // Clear specific item
            navigate("/"); // Navigate to the specified path
            alert("Logged out successfully!"); // Optional: Display a logout message
        };
    
        const dailyNotices = [
            {
                content: "Reminder: Your assignment for Web Programming is due tomorrow by 5 PM. Make sure to submit it on time!",
                link: "#"
            },
            {
                content: "Don't forget to check your class schedule for today! Ensure you have all your materials ready.",
                link: "#"
            },
            {
                content: "Always stay updated in your student portal",
                link: "#"
            }
        ];
    
        return (
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
            <div className="dashboard">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h2>Dashboard</h2>
                    </div>
                    <nav className="nav-links">
                        <a href="#">Payment Info</a>
                        <a href="#">Registration</a>
                        <a href="#">Courses</a>
                        <a href="#">Drop Semester</a>
                        <a href="#">Result</a>
                        <a href="#">Notice</a>
                        <a href="#">Schedule</a>
                        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                        </nav>
                </aside>
    
                <main className="main-content">
                    <header className="header">
                        <h1>Welcome back, {` ${stuData.first_name}`}!</h1>
                        <p>Always stay updated in your student portal</p>
                        <section className="finance">
                        <div className="certificate-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/certireq')}>
                            <p>Request Certificate</p>
                        </div>
                        <div className="certificate-item" style={{ cursor: 'pointer' }}>
                            <p>View Certificate</p>
                        </div>
                        <div className="certificate-item" style={{ cursor: 'pointer' }}>
                            <p>Send Certificate</p>
                        </div>
                    </section>
                    </header>
    
                    <section className="finance">
                        <div className="finance-item">
                            <h3>${totalPayable}</h3>
                            <p>Total Payable</p>
                        </div>
                        <div className="finance-item">
                            <h3>${totalPaid}</h3>
                            <p>Total Paid</p>
                        </div>
                        <div className="finance-item">
                            <h3>${others}</h3>
                            <p>Others</p>
                        </div>
                    </section>
    
                    <section className="enrolled-courses" style={{ color: 'white' }}>
                        <h2>Enrolled Courses</h2>
                        {enrolledCourses.map((course, index) => (
                            <div className="course-instructors" key={index}>
                                <div className="instructor">{course}</div>
                            </div>
                        ))}
                    </section>
                    
                    <section className="course-instructors" style={{ color: 'white' }}>
                        <h2>Academic Advisors</h2>
                        <div className="instructors">
                            {/* Replace with actual images or avatars */}
                            <div className="instructor">John kliewe</div>
                            <div className="instructor">James William</div>
                            <div className="instructor">George Harry</div>
                        </div>
                    </section>
    
                    <section className="daily-notices"  style={{ color: 'white' }}>
                        <h2>Daily Notice</h2>
                        {dailyNotices.map((notice, index) => (
                            <div className="notice-item" key={index}>
                                <h3>{notice.title}</h3>
                                <p>{notice.content}</p>
                               
                            </div>
                        ))}
                    </section>
                </main>
            </div>
            </div>
        );
    };
    
    export default Studindex;
    