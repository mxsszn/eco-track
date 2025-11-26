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
            <div className="container">
            <button onClick={clearLocalStorage}>clear storage</button>
            <div className="register-container">
                <h1 className="formTitle">Thank you for signing up!</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username" className="textfield" placeholder="username" value={inputs.username} onChange={handleChange}/>
                <div className="namediv">
                <input type="text" name="firstname" className="textfield" placeholder="First Name" value={inputs.firstname} onChange={handleChange}/>
                <input type="text" name="lastname" className="textfield" placeholder="Last Name" value={inputs.lastname} onChange={handleChange}/>
                </div>
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