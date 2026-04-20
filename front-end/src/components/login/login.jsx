import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import Navbar from '../navbar/navbar';



function LoginForm() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({... values, [name]: value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            username: inputs.username,
            password: inputs.password,
        }
        try {
            const response = await fetch ("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(submitData)
            }).then(response => response.json())
            localStorage.setItem("userdata", JSON.stringify(response))
            loadProfileData()
            localStorage.setItem("loggedIn", true)
            navigate("/profile")

        } catch (error) {
            
        }
    }

    const loadProfileData = async () => {
        console.log("loading profile data")
        let userdata = JSON.parse((localStorage.getItem("userdata")))
        let userId = userdata.user_id
        try {
            const response = await fetch (`http://localhost:8080/api/profile/${userId}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(response => response.json())
            localStorage.setItem("profiledata", JSON.stringify(response))
        } catch (error) {
            
        }


    }

    
    return(
            <div className="container">
            <div className="login-container">
                <h1 className="formTitle">Welcome back!</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username" className="textfield" placeholder="Username" value={inputs.username} onChange={handleChange}/>
                <input type="password" name="password" className="textfield" placeholder="Password" value={inputs.password} onChange={handleChange}/>
                <input className="button" type="submit" value="Log In"></input>
                </form>
        </div>
    </div>
    )

}

export default LoginForm;