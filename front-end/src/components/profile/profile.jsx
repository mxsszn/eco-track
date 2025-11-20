
import "./profile.css"
import pfp from "./testimg1.jpg"

const dummyData = {
    username : "placeholder30",
    registerDate : "18-Mar-2025",
    ecorank: "4",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo consequat convallis. Quisque et lorem ut quam interdum feugiat id nec sem. Sed vitae massa non mauris placerat gravida. Fusce volutpat est vitae tortor vehicula tempor vel non massa. In varius eros diam, eu laoreet sapien luctus sit amet. Aliquam pellentesque, magna sed placerat lobortis, est eros sollicitudin felis, quis scelerisque felis diam vitae dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}


function Profile() {
    return (
        <>
        <div class="profile-grid">
            <div class="griditem1">
                <div class="flexitem1">
                    <img class="profile-picture" src={pfp} alt="tygrys"/>
                    <div class="userdata">
                    <div class="line1">
                        <p1>{dummyData.username}</p1>
                        <p2>Eco rank {dummyData.ecorank}</p2>
                    </div>
                        <p3>A user since <b>{dummyData.registerDate}</b></p3>
                    </div>                     
                </div>                 
                    <div class="infobox">
                    <desctitle>Here is a short description about myself!</desctitle>
                    <description>
                        {dummyData.description}
                    </description>
                    </div>
                </div>
            <div class="griditem2">
            <div>test</div>

            </div>
            </div>
        </>
    )

}



export default Profile;