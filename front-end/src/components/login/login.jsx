import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase'; // Ensure this path matches your file structure
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './login.css';

function LoginForm() {
    // State for inputs and errors
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle text changes
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // Handle Email/Password Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear old errors

        // Basic validation
        if (!inputs.email || !inputs.password) {
             setError("Please enter both email and password.");
             return;
        }

        try {
            // 1. Firebase Auth Logic
            await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
            
            // 2. Set LocalStorage (for your App.jsx protection logic)
            localStorage.setItem("loggedIn", "true");
            
            // 3. Redirect
            alert("Login Successful!");
            navigate('/dashboard'); 

        } catch (err) {
            console.error(err);
            // Generic error for security, or specific if you prefer
            setError("Invalid email or password. Please try again.");
        }
    }

    // Handle Google Login
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            
            localStorage.setItem("loggedIn", "true");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError("Google Sign In Failed. Please try again.");
        }
    }

    return(
        <div className="container">
            <div className="login-container">
                <h1 className="formTitle">Welcome back!</h1>
                
                {/* Error Message Display */}
                {error && <div className="error-message" style={{color: 'red', marginBottom: '15px', fontWeight: 'bold'}}>{error}</div>}

                <form className="loginForm" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <input 
                        type="text" 
                        name="email" 
                        className="textfield" 
                        placeholder="Email Address" 
                        value={inputs.email || ""} 
                        onChange={handleChange}
                    />
                    
                    {/* Password Input */}
                    <input 
                        type="password" 
                        name="password" 
                        className="textfield" 
                        placeholder="Password" 
                        value={inputs.password || ""} 
                        onChange={handleChange}
                    />
                    
                    <input className="button" type="submit" value="Log In"></input>
                </form>

                 {/* Google Button Section */}
                 <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <p style={{marginBottom: '10px', color: '#666'}}>Or continue with</p>
                    <button 
                        onClick={handleGoogleSignIn} 
                        style={{
                            padding: '10px 20px', 
                            background: '#4285F4', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}
                    >
                        Sign in with Google 🇬
                    </button>
                </div>

                <p style={{marginTop: '25px', textAlign: 'center', color: '#333'}}>
                    Need an account? <Link to="/register" style={{color: '#27ae60', fontWeight: 'bold', textDecoration: 'none'}}>Register Here</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;