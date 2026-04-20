import { useRef, useState } from 'react'
import '../login/login.css'
import axios from 'axios'

function RegisterForm() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();

    const componentRef = useRef();

    const validateForm = () => {
        let formValid = false;
        if (
            username.current.validity.valueMissing ||
            email.current.validity.valueMissing ||
            password.current.validity.valueMissing ||
            rePassword.current.validity.valueMissing
        ) {
            alert("missing fields")
        }
        else if (email.current.validity.typeMismatch){
            alert("Invalid e-mail address. Please enter your e-mail again.");
        }
        else if (password.current.validity.tooShort){
            alert("Password is too short. Please select another password");
        }
        else if (password.current.value !== rePassword.current.value){
            alert("Passwords do not match. Please retry");
        }
        else {
            formValid = true;
        }
        return formValid;

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm();
    }



    return(
            <div className="container">
            <div className="register-container">
                <h1 className="formTitle">Thank you for signing up!</h1>
                <form className="loginForm" onSubmit={handleSubmit} noValidate ref={componentRef}>
                <input type="text" name="username" className="textfield" placeholder="username" ref={username} required/>
                <input type="email" name="email" className="textfield" placeholder="Email" ref={email} required/>
                <input type="password" name="password" className="textfield" placeholder="Password" ref={password} required minLength="8"/>
                <input type="password" name="repassword" className="textfield" placeholder="Confirm Password" ref={rePassword} required/>
                <input className="button" type="submit" value="Sign Up"></input>
                </form>
        </div>
    </div>
    )

}

export default RegisterForm;