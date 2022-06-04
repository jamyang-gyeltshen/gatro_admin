import React,{useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import './Header.css'



const Header = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const location = useLocation();

    useEffect(()=> {
        if(location.pathname==="/") {
            setActiveTab("Dashboard")
        }
        else if (location.pathname === "/add") {
            setActiveTab("Adduser")
        }
        else if (location.pathname === "/about") {
            setActiveTab("About")
        }

    },[location]);
  return (
    <div className='header'>
        <p className='logo'>Gatro Admin Panel</p>
        <div className='header-right'>
            <Link to={"/"}>
                <p 
                className={`${activeTab === "Dashboard" ? "active": ""}`}
                onClick={()=> setActiveTab("Dashboard")}
                >
                    Dashboard
                </p>
            </Link>
            <Link to={"/add"}>
                <p 
                className={`${activeTab === "Adduser" ? "active": ""}`}
                onClick={()=> setActiveTab("Adduser")}
                >
                    Adduser
                </p>
            </Link>
            <Link to={"/about"}>
                <p 
                className={`${activeTab === "About" ? "active": ""}`}
                onClick={()=> setActiveTab("About")}
                >
                    About
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Header