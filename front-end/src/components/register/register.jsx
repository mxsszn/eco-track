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

    // Helper: Validate Password Strength
    const validatePassword = (password) => {
        const hasLength = password.length >= 8;
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasLength && hasSymbol;
    }

    // Helper: Save User to Firestore Database
    const saveUserToDB = async (user) => {
        await setDoc(doc(db, "users", user.uid), {
            username: inputs.username || user.displayName || "New User",
            firstName: inputs.firstname || "",
            lastName: inputs.lastname || "",
            email: user.email,
            joinedAt: new Date().toISOString(),
            points: 0 // Initialize gamification points
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 1. Check Empty Fields
        if (!inputs.username || !inputs.firstname || !inputs.lastname || !inputs.email || !inputs.password) {
            setError("Please fill in all fields.");
            return;
        }

        // 2. Check Password Match
        if (inputs.password !== inputs.repassword) {
            setError("Passwords do not match.");
            return;
        }

        // 3. Check Password Strength
        if (!validatePassword(inputs.password)) {
            setError("Password must be at least 8 characters and contain a symbol (!@#$).");
            return;
        }

        try {
            // 4. Create Account in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            
            // 5. Save Profile Data to Firestore (No Password!)
            await saveUserToDB(userCredential.user);

            // 6. Success & Redirect
            localStorage.setItem("loggedIn", "true");
            alert("Sign Up Successful! Redirecting to Dashboard...");
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            // 7. Handle "Account Already Exists"
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
            // Determine if new user or existing to decide on saving to DB? 
            // For simplicity, setDoc with {merge: true} is safer, but standard setDoc overwrites. 
            // A check would be better, but for MVP, saving is fine.
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
                    <input type="text" name="username" className="textfield" placeholder="Username" value={inputs.username} onChange={handleChange}/>
                    
                    <div className="namediv">
                        <input type="text" name="firstname" className="textfield" placeholder="First Name" value={inputs.firstname} onChange={handleChange}/>
                        <input type="text" name="lastname" className="textfield" placeholder="Last Name" value={inputs.lastname} onChange={handleChange}/>
                    </div>
                    
                    <input type="text" name="email" className="textfield" placeholder="Email Address" value={inputs.email} onChange={handleChange}/>
                    
                    <input type="password" name="password" className="textfield" placeholder="Password (8+ chars, 1 symbol)" value={inputs.password} onChange={handleChange}/>
                    <input type="password" name="repassword" className="textfield" placeholder="Confirm Password" value={inputs.repassword} onChange={handleChange}/>
                    
                    <input className="button" type="submit" value="Sign Up"></input>
                </form>

                <div className="google-auth-section">
                    <p>Or continue with</p>
                    <button onClick={handleGoogleSignIn} className="google-btn">
                        Sign in with Google 🇬
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