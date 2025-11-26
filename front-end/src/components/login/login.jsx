import { useState } from 'react'
import './login.css'




function LoginForm() {

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({... values, [name]: value}))
    }

    const handleSubmit = (e) => {
        const submitData = {
            username: inputs.username,
            password: inputs.password,
        }
        handleLogin(submitData)
    }

    

    const handleLogin = (data) => {
        if (data.username == localStorage.getItem("username") && data.password == localStorage.getItem("password")) {
            alert("success!")
            localStorage.setItem("loggedIn", true)

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