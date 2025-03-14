import React from 'react'
import { useState } from 'react';
import { MdLogin} from "react-icons/md";
//import { MdLogin, MdLogout, MdPostAdd } from "react-icons/md";
//import { ImProfile } from "react-icons/im";
import { FaHospital } from "react-icons/fa";
import '../Navbar/navbar.css'
// import image from '../Images/BedPortal1.png'
const MainNavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                {/* <img src={image} ></img> */}
                <span class="cursive-font">Resource_Manager</span>
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
                {/* hamburger svg code... */}
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <a href="/"><FaHospital />Home</a>
                    </li>
                    <li>
                        <a href="/adminlogin"><MdLogin /> Admin</a>
                    </li>
                    <li >
                        <a href="/userlogin" ><MdLogin />User</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MainNavBar;