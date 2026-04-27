import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../auth/auth.css'

function LoginForm({ onLogin }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: inputs.username,
                    password: inputs.password,
                })
            });

            if (!response.ok) {
                setError("Invalid username or password. Please try again.");
                return;
            }

            const data = await response.json();

            localStorage.setItem("userdata", JSON.stringify(data));
            localStorage.setItem("loggedIn", "true");
            if (data.user_id) {
                localStorage.setItem("userId", data.user_id);
            }

            try {
                const profileRes = await fetch(`http://localhost:8080/api/profile/${data.user_id}`);
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    localStorage.setItem("profiledata", JSON.stringify(profileData));
                }
            } catch (err) {
                console.error("Profile load error:", err);
            }

            if (onLogin) onLogin();
            navigate("/dashboard");

        } catch (err) {
            setError("Login failed. Make sure the backend is running.");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">🌱</div>
                <h1 className="auth-title">Welcome back!</h1>
                <p className="auth-subtitle">Log in to view your eco impact</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        className="auth-input"
                        placeholder="Username"
                        value={inputs.username || ''}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="auth-input"
                        placeholder="Password"
                        value={inputs.password || ''}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit" className="auth-button">Log In</button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;