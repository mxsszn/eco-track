import { useState } from 'react'
import '../login/login.css'

function RegisterForm() {

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({... values, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            username: inputs.username,
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            email: inputs.email,
            password: inputs.password,
            repassword: inputs.repassword
        }

        saveData(submitData)

    }

const saveData = (data) => {
    localStorage.setItem("username", data.username)
    localStorage.setItem("firstname", data.firstname)
    localStorage.setItem("lastname", data.lastname)
    localStorage.setItem("email", data.email)
    localStorage.setItem("password", data.password)
}

const clearLocalStorage = () => {
    localStorage.clear()
    alert("Local storage cleared")
}
 





    return(
            <div class="container">
            <button onClick={clearLocalStorage}>clear storage</button>
            <div class="register-container">
                <h1 class="formTitle">Thank you for signing up!</h1>
                <form class="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username" class="textfield" placeholder="username" value={inputs.username} onChange={handleChange}/>
                <div class="namediv">
                <input type="text" name="firstname" class="textfield" placeholder="First Name" value={inputs.firstname} onChange={handleChange}/>
                <input type="text" name="lastname" class="textfield" placeholder="Last Name" value={inputs.lastname} onChange={handleChange}/>
                </div>
                <input type="text" name="email" class="textfield" placeholder="Email" value={inputs.email} onChange={handleChange}/>
                <input type="password" name="password" class="textfield" placeholder="Password" value={inputs.password} onChange={handleChange}/>
                <input type="password" name="repassword" class="textfield" placeholder="Confirm Password" value={inputs.repassword} onChange={handleChange}/>
                <input class="button" type="submit" value="Sign Up"></input>
                </form>
        </div>
    </div>
    )

}

export default RegisterForm;