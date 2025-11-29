import ProfileChart from "./ProfileChart"
import "./profile.css"
import pfp from "./testimg1.jpg"

const dummyData = {
    username : "placeholder30",
    registerDate : "18-Mar-2025",
    ecorank: "4",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo consequat convallis. Quisque et lorem ut quam interdum feugiat id nec sem. Sed vitae massa non mauris placerat gravida. Fusce volutpat est vitae tortor vehicula tempor vel non massa. In varius eros diam, eu laoreet sapien luctus sit amet. Aliquam pellentesque, magna sed placerat lobortis, est eros sollicitudin felis, quis scelerisque felis diam vitae dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}

const dummyUser = {
    pfplink: pfp,
    displayName : "testUser",
    ecorank: 5,
    userId : "1",
}




function Profile() {
    return (
        <>
        <div className="parent">
            <div className="div1">
                <div className="flexitem1">
                    <img className="profile-picture" src={pfp} alt="tygrys"/>
                    <div className="userdata">
                    <div className="line1">
                        <p1>{dummyData.username}</p1>
                        <p2>Eco rank {dummyData.ecorank}</p2>
                    </div>
                        <p3>A user since <b>{dummyData.registerDate}</b></p3>
                    </div>                     
                </div>                 
                    <div className="infobox">
                    <div className="desctitle">About me</div>
                    <div className="description">
                        {dummyData.description}
                    </div>
                    </div>
                </div>
            <div className="div2">
                <div className="leaderboardTitle">Weekly Leaderboard</div>
                <div className="leaderboardEntry">ENTRY 1</div>




            </div>
            <div className="div3">
            <div className="divTitle">Recent planet saving activity (ECO points)</div>
            <ProfileChart></ProfileChart>
            </div>
            </div>
        </>
    )

}



export default Profile;