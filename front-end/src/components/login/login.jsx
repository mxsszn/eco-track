import { useState } from 'react';
import { createRoot }
import './login.css'

function LoginForm() {

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({... values, [name]: value}))
    }



    return(
    <div class="container">
            <div class="login-container">
                <h1 class="formTitle">Header</h1>
                <form class="loginForm" onSubmit={handleSubmit}>
                <label>Name: </label><br/>
                <input type="text" name="firstname" value={inputs.firstname} onChange={handleChange}/><br/>
                <label>Email: </label><br/>
                <input type="text" name="email" value={inputs.email} onChange={handleChange}/><br/>
                <label>Password: </label><br/>
                <input type="password" name="password" value={inputs.password} onChange={handleChange}/><br/>
                <label>Retype Password: </label><br/>
                <input type="password" name="repassword" value={inputs.repassword} onChange={handleChange}/><br/>

                <input type="submit"/>
                </form>
        </div>
    </div>
    )

}

export default LoginForm;