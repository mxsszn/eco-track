import "./navbar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Define routes where Navbar should be hidden
    // If you want it hidden on Home ('/') too because that's your register page now:
    const hideNavbarRoutes = ['/', '/login', '/register'];

    if (hideNavbarRoutes.includes(location.pathname)) {
        return null; // Don't render anything
    }

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await signOut(auth);
                localStorage.removeItem("loggedIn");
                navigate('/login');
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    };

    return(
        <header>
            <div className="navbar">
                {/* Removed "Startup 2" text if it was here, keeping just links */}
                
                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/log-journey">Log Journey</Link>
                    <Link to="/calculator">Calculator</Link>
                    <Link to="/education">Learn</Link>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">Account 
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout} className="logout-btn">Log Out</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;