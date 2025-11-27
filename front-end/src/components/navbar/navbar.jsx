import "./navbar.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "../home/home";
import Profile from "../profile/profile";
import RegisterForm from "../Register/register";
import LoginForm from "../login/login";



function AccountDropdown() {

    if (localStorage.getItem("loggedIn") == "false") {
            return(
                <>
                <Link to="/login" className="login">Login</Link>
                <Link to="/register" className="login">Register</Link>
                </>
            )
    }

    if (localStorage.getItem("loggedIn") == "true") {
        return (
        <div className="dropdown">
            <button className="dropbtn">Account 
            <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="settings">Settings</Link>
                <Link to="logout">Log Out</Link>
            </div>
        </div>

        )

    }
}





function Navbar() {
    return(
        <>
        <header>
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/about">About</Link>
                <AccountDropdown/>
            </div>
        </header>

        </>
    );
}

export default Navbar;