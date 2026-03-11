// Filename - components/Sidebar.js

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import logout from '../assets_components/logout.webp';

const Nav = styled.div`
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: rgba(255, 255, 255, 0.7);
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const showSidebar = () => setSidebar(!sidebar);

const handleLogout = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("studata"); // Clear specific item
    navigate("/"); // Navigate to the specified path
    alert("Logged out successfully!"); // Optional: Display a logout message
};

    return (
        <>
            <IconContext.Provider value={{ color: "#000" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars
                            onClick={showSidebar}
                        />
                    </NavIcon>
                    <h1
                        style={{
                            textAlign: "center",
                            marginLeft: "20px",
                            color:"white"
                        }}
                    >
                        Vasthavik
                    </h1>
                            <ul class="nav-items">
                            <li onClick={handleLogout}>
    <img src={logout} alt="Logout" style={{ width: '30px', height: '30px' }} />
</li>
        </ul>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose
                                onClick={showSidebar}
                                style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }} 
                            />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
