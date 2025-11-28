import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for login status changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, send them to dashboard
                console.log("User is logged in:", user.email);
                localStorage.setItem("loggedIn", "true");
                navigate('/dashboard');
            } else {
                // User is signed out, stay here or go to login
                console.log("User is signed out");
                localStorage.setItem("loggedIn", "false");
                setLoading(false);
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Welcome to Startup 2</h1>
            <p>Please log in to continue.</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
            <button onClick={() => navigate('/register')}>Register New Account</button>
        </div>
    );
}

export default AuthPage;