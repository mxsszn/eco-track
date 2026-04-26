import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'

function LoginForm({ onLogin }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const submitData = {
            username: inputs.username,
            password: inputs.password,
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                setError("Invalid username or password. Please try again.");
                return;
            }

            const data = await response.json();

            // Store user data and userId in localStorage
            localStorage.setItem("userdata", JSON.stringify(data));
            localStorage.setItem("loggedIn", "true");

            // Store userId so dashboard and other pages can use it
            if (data.user_id) {
                localStorage.setItem("userId", data.user_id);
            }

            // Load profile data after login
            await loadProfileData(data.user_id);

            // Tell App.jsx the user is now logged in
            if (onLogin) onLogin();

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Make sure the backend is running.");
        }
    }

    const loadProfileData = async (userId) => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:8080/api/profile/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("profiledata", JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    }

    return (
        <div className="container">
            <div className="login-container">
                <h1 className="formTitle">Welcome back!</h1>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <form className="loginForm" onSubmit={handleSubmit}>
                    <input type="text" name="username" className="textfield" placeholder="Username" value={inputs.username || ''} onChange={handleChange} />
                    <input type="password" name="password" className="textfield" placeholder="Password" value={inputs.password || ''} onChange={handleChange} />
                    <input className="button" type="submit" value="Log In" />
                </form>
            </div>
        </div>
    )
}

export default LoginForm;