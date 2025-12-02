import ProfileChart from "./ProfileChart"
import "./profile.css"
import pfp from "./testimg1.jpg"
import Leaderboard from "./ProfileLeaderboard"
import { useState } from "react"
import { _adapters } from "chart.js"
import testUserData from './userdata.json';

const dummyUser = {
    pfplink: pfp,
    displayName : "testUser",
    ecorank: 5,
    userId : "1",
    totalEP: "1040",
    weekEP: "134",
    CO2Disp: "560g"
}


function loadUserData() {







}




function toggleEditMode(state, setState) {
    if (state == false) {
        setState(true);

    }
    else if (state == true) {
        setState(false);
    }
}


function submitChanges(userData, userInput, setUserData, editMode, setEditMode) {
    if (!userInput.username || !userInput.description) {
        alert("You have not filled every field, please check the changes you have made");
    }

else {
    userData.username = userInput.username;
    userData.description = userInput.description;
    setUserData(userData);
    setEditMode(false);
}

}


function Editor(props) {
    const userData = props.userData
    const setUserData = props.setUserData
    const setEditMode = props.setEditMode
    const editMode = props.editMode
    const [userInput, setUserInput] = useState({});

    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput(values => ({...values, [name]: value}))
    }


    return (
        <div className="parent">
            <div className="div1">
                <div className="flexitem1">
                    <img className="profile-picture" src={pfp} alt="tygrys"/>
                    <div className="userdata">
                    <div className="line1">
                        <input type="text" name="username" className="changeUsername" placeholder={userData.username} value={userInput.username} onChange={handleChange}/>#
                        <p2>Eco rank {userData.ecorank}</p2>
                    </div>
                        <p3>A user since <b>{userData.creationDate}</b></p3>
                    </div>                     
                </div>                 
                    <div className="infobox">
                    <div className="desctitle">About me
                    <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Cancel</button>
                    <button className="editButton" onClick={() => submitChanges(userData, userInput, setUserData, editMode, setEditMode)}>Save</button>
                    </div>
                    <textarea className="changeDescription" placeholder="Describe yourself!" value={userInput.description} name="description" onChange={handleChange}></textarea>
                    </div>
                </div>
            <div className="div2">
            <div className="leaderboardTitle">Weekly Leaderboard</div>
                <Leaderboard/>
                <div className="leaderboardButtonContainer">
                    <div className="leaderboardLink">View full leaderboard</div>
                </div>
            </div>
            <div className="div3">
            <div className="divTitle">Recent planet saving activity (ECO points)</div>
            <ProfileChart weeklyEP={userData.weeklyEP}></ProfileChart>
            </div>
            </div>

        )


}







function Profile() {

    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState(testUserData);





    return (
        <>
        {!editMode &&
        <div className="parent">
            <div className="div1">
                <div className="flexitem1">
                    <img className="profile-picture" src={pfp} alt="tygrys"/>
                    <div className="userdata">
                    <div className="line1">
                        <p1>{userData.username}</p1>
                        <p2>Eco rank {userData.ecorank}</p2>
                    </div>
                        <p3>A user since <b>{userData.creationDate}</b></p3>
                    </div>                     
                </div>                 
                    <div className="infobox">
                    <div className="desctitle">About me
                    <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Edit Profile</button>
                    </div>
                    <div className="description">
                        {userData.description}
                    </div>
                    </div>
                </div>
            <div className="div2">
            <div className="leaderboardTitle">Weekly Leaderboard</div>
                <Leaderboard/>
                <div className="leaderboardButtonContainer">
                    <div className="leaderboardLink">View full leaderboard</div>
                </div>
            </div>
            <div className="div3">
            <div className="divTitle">Recent planet saving activity (ECO points)</div>
            <ProfileChart weeklyEP={userData.weeklyEP}></ProfileChart>
            </div>
            </div>
        }


        {editMode && <Editor userData={userData} setUserData={setUserData} setEditMode={setEditMode} editMode={editMode} />

        }





        </>
    )

}



export default Profile;