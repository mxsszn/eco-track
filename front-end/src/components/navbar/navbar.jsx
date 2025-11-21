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
                <Link to="/login" class="login">Login</Link>
                <Link to="/register" class="login">Register</Link>
                </>
            )
    }

    if (localStorage.getItem("loggedIn") == "true") {
        return (
        <div class="dropdown">
            <button class="dropbtn">Account 
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
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
        <BrowserRouter>
        <header>
            <div class="navbar">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/about">About</Link>
                <AccountDropdown/>
            </div>
        </header>



        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
        </Routes>

        </BrowserRouter>
        </>
    );
}

export default Navbar;