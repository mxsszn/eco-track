import "./navbar.css"
import { Link } from 'react-router-dom';

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
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Log Out</Link>
            </div>
        </div>
        )
    }
}

function Navbar() {
    return(
        <header>
            <div className="navbar">
                <Link to="/">Dashboard</Link>
                <Link to="/log-journey">Log Journey</Link>
                <Link to="/calculator">Carbon Calculator</Link> 
                <Link to="/education">Learn</Link>
                <AccountDropdown/>
            </div>
        </header>
    );
}

export default Navbar;