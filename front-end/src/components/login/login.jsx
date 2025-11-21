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
            <div class="container">
            <div class="login-container">
                <h1 class="formTitle">Welcome back!</h1>
                <form class="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username" class="textfield" placeholder="Username" value={inputs.username} onChange={handleChange}/>
                <input type="password" name="password" class="textfield" placeholder="Password" value={inputs.password} onChange={handleChange}/>
                <input class="button" type="submit" value="Log In"></input>
                </form>
        </div>
    </div>
    )

}

export default LoginForm;