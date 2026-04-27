import ProfileChart from "./ProfileChart"
import "./profile.css"
import pfp from "./testimg1.jpg"
import Leaderboard from "./ProfileLeaderboard"
import { useState } from "react"
import badge from "./badge.png"

function toggleEditMode(state, setState) {
    if (state == false) {
        setState(true);
    } else if (state == true) {
        setState(false);
    }
}

async function submitChanges(profileData, userInput, setProfileData, editMode, setEditMode) {
    if (!userInput.username) {
        userInput.username = profileData.profileUsername;
    }
    if (!userInput.description) {
        userInput.description = "";
    }
    const submitData = {
        profileUsername: userInput.username,
        bio: userInput.description,
        profileImageURL: profileData.profileImageURL,
        profile_id: profileData.profile_id
    }
    try {
        const response = await fetch(`http://localhost:8080/api/profile/update/${profileData.profile_id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(submitData)
        }).then(response => response.json())
        profileData.profileUsername = response.display_name;
        profileData.bio = response.bio;
    } catch (error) {
        console.error("Profile update error:", error);
    }
    localStorage.setItem("profiledata", JSON.stringify(profileData))
    setEditMode(false);
}

function Editor(props) {
    const profileData = props.profileData
    const setProfileData = props.setProfileData
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
                    <img className="profile-picture" src={pfp} alt="profile"/>
                    <div className="userdata">
                        <div className="line1">
                            <input type="text" name="username" className="changeUsername" placeholder={profileData.profileUsername || "Username"} value={userInput.profileUsername} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="infobox">
                    <div className="desctitle">About me
                        <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Cancel</button>
                        <button className="editButton" onClick={() => submitChanges(profileData, userInput, setProfileData, editMode, setEditMode)}>Save</button>
                    </div>
                    <textarea className="changeDescription" placeholder={profileData.bio || "Bio"} value={userInput.description} name="description" onChange={handleChange}></textarea>
                </div>
            </div>
            <div className="div2">
                <div className="leaderboardTitle">Weekly Leaderboard</div>
                <Leaderboard/>
            </div>
        </div>
    )
}

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("profiledata")) || {});
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userdata")) || {});
    const date = userData?.created_at ? new Date(userData.created_at) : new Date();

    return (
        <>
        {!editMode &&
        <div className="parent">
            <div className="div1">
                <div className="flexitem1">
                    <img className="profile-picture" src={profileData.profileImageURL || pfp} alt="profile"/>
                    <div className="userdata">
                        <div className="line1">
                            <p>{profileData.profileUsername || userData.username || "User"}</p>
                            <p>{profileData.tier || "Eco Starter"}</p>
                        </div>
                        <p>A user since <b>{date.toLocaleDateString('en-GB')}</b></p>
                    </div>
                </div>
                <div className="infobox">
                    <div className="desctitle">About me
                        <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Edit Profile</button>
                    </div>
                    <div className="description">
                        {profileData.bio || "No bio yet."}
                    </div>
                </div>
            </div>
            <div className="div2">
                <div className="leaderboardTitle">Weekly Leaderboard</div>
                <Leaderboard/>
            </div>
            <div className="div3">
                <div className="divTitle">Most CO2 Saved</div>
                <div className="parent3">
                    <div className="profileBadge">
                        <div className="badgeTitle">This Week</div>
                        <img src={badge} className="badgeImage" alt="badge"/>
                        <div className="badgeValue">{profileData.co2RecordWeek || 0} Kg of Co2</div>
                    </div>
                    <div className="profileBadge">
                        <div className="badgeTitle">This Month</div>
                        <img src={badge} className="badgeImage" alt="badge"/>
                        <div className="badgeValue">{profileData.co2RecordMonth || 0} Kg of Co2</div>
                    </div>
                    <div className="profileBadge">
                        <div className="badgeTitle">All Time!</div>
                        <img src={badge} className="badgeImage" alt="badge"/>
                        <div className="badgeValue">{profileData.co2RecordAlltime || 0} Kg of Co2</div>
                    </div>
                </div>
            </div>
        </div>
        }
        {editMode && 
            <Editor 
                profileData={profileData} 
                setProfileData={setProfileData} 
                setEditMode={setEditMode} 
                editMode={editMode} 
            />
        }
        </>
    )
}

export default Profile;