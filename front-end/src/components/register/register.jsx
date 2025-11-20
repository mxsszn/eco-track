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
        const submitData = {
            username: inputs.username,
            password: inputs.password,
            repassword: inputs.repassword,
        }
    }



    return(
            <div class="container">
            <div class="register-container">
                <h1 class="formTitle">Thank you for signing up!</h1>
                <form class="loginForm" onSubmit={handleSubmit}>
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