import { useState } from 'react'
import '../login/login.css'
import axios from 'axios'
 
function RegisterForm() {
 
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
 
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        // Basic validation — check passwords match
        if (inputs.password !== inputs.repassword) {
            setError("Passwords do not match");
            return;
        }
 
        const submitData = {
            username: inputs.username,
            email: inputs.email,
            password_hash: inputs.password,
        }
 
        try {
            // Send POST request to Spring Boot backend to create the user
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(submitData)
            });
 
            if (!response.ok) {
                throw new Error(`Registration failed (status ${response.status})`);
            }
 
            const data = await response.json();
 
            // Store the userId in localStorage so other pages like Dashboard can read it
            // Dashboard uses: localStorage.getItem('userId')
            if (data.user_id) {
                localStorage.setItem('userId', data.user_id);
            }
 
            // Redirect to dashboard after successful registration
            window.location.href = '/dashboard';
 
        } catch (error) {
            console.error('Registration error:', error);
            setError("Registration failed. Please try again.");
        }
    }
 
    const clearLocalStorage = () => {
        localStorage.clear()
        alert("Local storage cleared")
    }
 
    return (
        <div className="container">
            <div className="register-container">
                <h1 className="formTitle">Thank you for signing up!</h1>
 
                {/* Show error message if registration fails */}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
 
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input type="text" name="username" className="textfield" placeholder="username" value={inputs.username || ''} onChange={handleChange}/>
                    <input type="text" name="email" className="textfield" placeholder="Email" value={inputs.email || ''} onChange={handleChange}/>
                    <input type="password" name="password" className="textfield" placeholder="Password" value={inputs.password || ''} onChange={handleChange}/>
                    <input type="password" name="repassword" className="textfield" placeholder="Confirm Password" value={inputs.repassword || ''} onChange={handleChange}/>
                    <input className="button" type="submit" value="Sign Up"/>
                </form>
            </div>
        </div>
    )
}
 
export default RegisterForm;