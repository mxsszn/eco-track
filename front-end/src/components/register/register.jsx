import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase'; 
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './register.css';

function RegisterForm() {
    const [inputs, setInputs] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const validatePassword = (password) => {
        const hasLength = password.length >= 8;
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasLength && hasSymbol;
    }

    const saveUserToDB = async (user) => {
        await setDoc(doc(db, "users", user.uid), {
            username: inputs.username || user.displayName || "New User",
            firstName: inputs.firstname || "",
            lastName: inputs.lastname || "",
            email: user.email,
            joinedAt: new Date().toISOString(),
            points: 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!inputs.username || !inputs.firstname || !inputs.lastname || !inputs.email || !inputs.password) {
            setError("Please fill in all fields.");
            return;
        }

        if (inputs.password !== inputs.repassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!validatePassword(inputs.password)) {
            setError("Password must be at least 8 characters and contain a symbol (!@#$).");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            await saveUserToDB(userCredential.user);

            localStorage.setItem("loggedIn", "true");
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("⚠️ This account already exists! Please sign in instead.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak.");
            } else {
                setError(err.message);
            }
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            await saveUserToDB(result.user); 
            
            localStorage.setItem("loggedIn", "true");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError("Google Sign In Failed");
        }
    }

    return(
        <div className="container">
            <div className="register-container">
                <h1 className="formTitle">Create Account</h1>
                
                {error && <div className="error-message">{error}</div>}

                <form className="loginForm" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        className="textfield" 
                        placeholder="Username" 
                        value={inputs.username} 
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                    
                    <div className="namediv">
                        <input 
                            type="text" 
                            name="firstname" 
                            className="textfield" 
                            placeholder="First Name" 
                            value={inputs.firstname} 
                            onChange={handleChange}
                            autoComplete="given-name"
                            required
                        />
                        <input 
                            type="text" 
                            name="lastname" 
                            className="textfield" 
                            placeholder="Last Name" 
                            value={inputs.lastname} 
                            onChange={handleChange}
                            autoComplete="family-name"
                            required
                        />
                    </div>
                    
                    <input 
                        type="email" 
                        name="email" 
                        className="textfield" 
                        placeholder="Email Address" 
                        value={inputs.email} 
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        className="textfield" 
                        placeholder="Password (8+ chars, 1 symbol)" 
                        value={inputs.password} 
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <input 
                        type="password" 
                        name="repassword" 
                        className="textfield" 
                        placeholder="Confirm Password" 
                        value={inputs.repassword} 
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    
                    <input className="button" type="submit" value="Sign Up" />
                </form>

                <div className="google-section">
                    <p className="divider-text">Or continue with</p>
                    <button onClick={handleGoogleSignIn} className="google-btn">
                        🔐 Sign up with Google
                    </button>
                </div>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Sign In Here</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;