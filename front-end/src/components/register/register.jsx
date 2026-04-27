import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../auth/auth.css'

function RegisterForm({ onLogin }) {
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

        if (inputs.password !== inputs.repassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: inputs.username,
                    email: inputs.email,
                    password_hash: inputs.password,
                })
            });

            if (!response.ok) {
                setError("Registration failed. Username or email may already exist.");
                return;
            }

            const data = await response.json();

            if (data.user_id) {
                localStorage.setItem('userId', data.user_id);
                localStorage.setItem('userdata', JSON.stringify(data));
                localStorage.setItem('loggedIn', 'true');
            }

            if (onLogin) onLogin();
            navigate("/dashboard");

        } catch (err) {
            setError("Registration failed. Make sure the backend is running.");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">🌱</div>
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Start tracking your eco-friendly journeys</p>

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
                        type="email"
                        name="email"
                        className="auth-input"
                        placeholder="Email address"
                        value={inputs.email || ''}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="auth-input"
                        placeholder="Password"
                        value={inputs.password || ''}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <input
                        type="password"
                        name="repassword"
                        className="auth-input"
                        placeholder="Confirm password"
                        value={inputs.repassword || ''}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;