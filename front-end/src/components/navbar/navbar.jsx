import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';
 
function AccountDropdown() {
    const navigate = useNavigate();
 
    const logoutLogic = () => {
        localStorage.clear();
        localStorage.setItem("loggedIn", false);
        navigate("/login");
    }
 
    if (!localStorage.getItem("userId")) {
        return (
            <>
                <Link to="/login" className="login">Login</Link>
                <Link to="/register" className="login">Register</Link>
            </>
        )
    }
 
    return (
        <div className="dropdown">
            <button className="dropbtn">Account
                <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <a onClick={logoutLogic} style={{ cursor: 'pointer' }}>Log Out</a>
            </div>
        </div>
    )
}
 
function Navbar() {
    return (
        <header>
            <div className="navbar">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/log-journey">Log Journey</Link>
                <Link to="/calculator">Calculator</Link>
                <Link to="/education">Learn</Link>
                <AccountDropdown />
            </div>
        </header>
    );
}
 
export default Navbar;