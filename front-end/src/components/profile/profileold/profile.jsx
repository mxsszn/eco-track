import ProfileChart from "./ProfileChart"
import "./profile.css"
import pfp from "./testimg1.jpg"
import Leaderboard from "./ProfileLeaderboard"
import { useState, useEffect } from "react"
import badge from "./badge.png"
 
function toggleEditMode(state, setState) {
    if (state == false) {
        setState(true);
    } else if (state == true) {
        setState(false);
    }
}
 
async function submitChanges(profileData, userInput, setProfileData, editMode, setEditMode) {
    console.log("SUBMITTING")
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData)
        }).then(response => response.json())
        profileData.profileUsername = response.display_name;
        profileData.bio = response.bio;
    } catch (error) {
        console.error("Error submitting changes:", error);
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
        setUserInput(values => ({ ...values, [name]: value }))
    }
 
    return (
        <div className="parent">
            <div className="div1">
                <div className="flexitem1">
                    <img className="profile-picture" src={pfp} alt="profile"/>
                    <div className="userdata">
                        <div className="line1">
                            <input type="text" name="username" className="changeUsername" placeholder={profileData.profileUsername} value={userInput.profileUsername || ''} onChange={handleChange} />#
                            <p>{profileData.ecorank}</p>
                        </div>
                        <p>A user since <b>{profileData.creationDate}</b></p>
                    </div>
                </div>
                <div className="infobox">
                    <div className="desctitle">About me
                        <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Cancel</button>
                        <button className="editButton" onClick={() => submitChanges(profileData, userInput, setProfileData, editMode, setEditMode)}>Save</button>
                    </div>
                    <textarea className="changeDescription" placeholder={profileData.bio} value={userInput.description || ''} name="description" onChange={handleChange}></textarea>
                </div>
            </div>
            <div className="div2">
                <div className="leaderboardTitle">Weekly Leaderboard</div>
                <Leaderboard />
                <div className="leaderboardButtonContainer">
                    <div className="leaderboardLink">View full leaderboard</div>
                </div>
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
    )
}
 
function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("profiledata")));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userdata")));
    const [loading, setLoading] = useState(true);
 
    // Fetch profile data from backend if not in localStorage
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!profileData && userId) {
            fetch(`http://localhost:8080/api/profile/${userId}`)
                .then(res => res.json())
                .then(data => {
                    const formatted = {
                        profileUsername: data.display_name || 'User',
                        bio: data.bio || '',
                        profileImageURL: data.profile_image_url || null,
                        tier: data.tier_name || 'Eco Starter',
                        profile_id: data.profile_id,
                        co2RecordWeek: 0,
                        co2RecordMonth: 0,
                        co2RecordAlltime: data.total_co2_saved || 0
                    };
                    setProfileData(formatted);
                    localStorage.setItem("profiledata", JSON.stringify(formatted));
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching profile:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);
 
    // Show loading while fetching
    if (loading) return <div>Loading profile...</div>;
 
    // Show message if no profile data available
    if (!profileData) return <div>Profile not found. Please log in again.</div>;
 
    // Get creation date safely
    const date = userData?.created_at ? new Date(userData.created_at) : null;
 
    return (
        <>
            {!editMode &&
                <div className="parent">
                    <div className="div1">
                        <div className="flexitem1">
                            <img className="profile-picture" src={profileData.profileImageURL || pfp} alt="profile"/>
                            <div className="userdata">
                                <div className="line1">
                                    <p>{profileData.profileUsername}</p>
                                    <p>Eco rank: {profileData.tier}</p>
                                </div>
                                <p>A user since <b>{date ? date.toLocaleDateString('en-GB') : 'N/A'}</b></p>
                            </div>
                        </div>
                        <div className="infobox">
                            <div className="desctitle">About me
                                <button className="editButton" onClick={() => toggleEditMode(editMode, setEditMode)}>Edit Profile</button>
                            </div>
                            <div className="description">
                                {profileData.bio || 'No bio yet.'}
                            </div>
                        </div>
                    </div>
                    <div className="div2">
                        <div className="leaderboardTitle">Weekly Leaderboard</div>
                        <Leaderboard />
                        <div className="leaderboardButtonContainer">
                            <div className="leaderboardLink">View full leaderboard</div>
                        </div>
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
 
            {editMode && <Editor profileData={profileData} setProfileData={setProfileData} setEditMode={setEditMode} editMode={editMode} />}
        </>
    )
}
 
export default Profile;