import { useState } from 'react'
import '../login/login.css'
import axios from 'axios'

function RegisterForm() {

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
            email: inputs.email,
            password_hash: inputs.password,
        }

        try {
            const response = await fetch ("http://localhost:8080/api/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(submitData)
        })} 
        catch (error) {    
        }

        saveData(submitData)

    }





const saveData = (data) => {
    localStorage.setItem("username", data.username)
    localStorage.setItem("email", data.email)
    localStorage.setItem("password", data.password)
}


const clearLocalStorage = () => {
    localStorage.clear()
    alert("Local storage cleared")
}
 
    return(
            <div className="container">
            <div className="register-container">
                <h1 className="formTitle">Thank you for signing up!</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username" className="textfield" placeholder="username" value={inputs.username} onChange={handleChange}/>
                <input type="text" name="email" className="textfield" placeholder="Email" value={inputs.email} onChange={handleChange}/>
                <input type="password" name="password" className="textfield" placeholder="Password" value={inputs.password} onChange={handleChange}/>
                <input type="password" name="repassword" className="textfield" placeholder="Confirm Password" value={inputs.repassword} onChange={handleChange}/>
                <input className="button" type="submit" value="Sign Up"></input>
                </form>
        </div>
    </div>
    )

}

export default RegisterForm;