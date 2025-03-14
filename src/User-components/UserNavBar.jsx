import React from 'react'
import { useState } from 'react';
import { MdLogout, MdPostAdd } from "react-icons/md";
import '../User-components/navbar.css'
import { FaUserAlt } from "react-icons/fa";
const UserNavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                <span className="cursive-font">Resource_Manager</span>
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <a href="/userRequestView"><FaUserAlt /> UserRequests</a>
                    </li>
                    <li>
                        <a href="/addUserRequest"><MdPostAdd /> Add Request</a>
                    </li>
                    <li>
                        <a href="/" onClick={() => sessionStorage.clear()}><MdLogout /> Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default UserNavBar;