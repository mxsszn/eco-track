import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {loggedIn && <Link to="/dashboard">Dashboard</Link>}
                {loggedIn && <Link to="/log-journey">Log Journey</Link>}
                {loggedIn && <Link to="/calculator">Calculator</Link>}
                {loggedIn && <Link to="/education">Learn</Link>}
                {!loggedIn && <Link to="/login">Login</Link>}
                {!loggedIn && <Link to="/register">Register</Link>}
            </div>

            {loggedIn && (
                <div className="navbar-right">
                    <div className="dropdown">
                        <button className="dropbtn">Account ▾</button>
                        <div className="dropdown-content">
                            <Link to="/profile">Profile</Link>
                            <a onClick={handleLogout} style={{cursor:'pointer'}}>Log Out</a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;