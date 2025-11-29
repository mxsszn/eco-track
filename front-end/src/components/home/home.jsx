import { useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";



function Home() {

    const [userChoice, setUserChoice] = useState();


    return(
        <>
        <div className="parent-home">
            <div className="div1-home">
                <div className="homeHeader">
                    <h1>Are you ready to help save the planet?</h1>
                </div>
            </div>
            <div className="div2-home">
                    
                        <Link to="/register" className="choice-button">Sign Up</Link>
                
                        <Link to="/login" className="choice-button">I already have an account</Link>
                    
            </div>
        </div>
        </>
    )

}

export default Home;