import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './login.css';

function LoginForm() {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!inputs.email || !inputs.password) {
             setError("Please enter both email and password.");
             return;
        }

        try {
            await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
            localStorage.setItem("loggedIn", "true");
            navigate('/dashboard'); 

        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        }
    }

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
                
                {error && <div className="error-message">{error}</div>}

                <form className="loginForm" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        className="textfield" 
                        placeholder="Email Address" 
                        value={inputs.email || ""} 
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        className="textfield" 
                        placeholder="Password" 
                        value={inputs.password || ""} 
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                    
                    <input className="button" type="submit" value="Log In" />
                </form>

                <div className="google-section">
                    <p className="divider-text">Or continue with</p>
                    <button onClick={handleGoogleSignIn} className="google-btn">
                        🔐 Sign in with Google
                    </button>
                </div>

                <p className="switch-auth">
                    Need an account? <Link to="/register">Register Here</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;