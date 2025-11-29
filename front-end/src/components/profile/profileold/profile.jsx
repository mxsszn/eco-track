import "./profile.css";
import pfp from "./testimg1.jpg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from 'faker';


const topConst = 'top';

const dummyData = {
    username : "placeholder30",
    registerDate : "18-Mar-2025",
    ecorank: "4",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo consequat convallis. Quisque et lorem ut quam interdum feugiat id nec sem. Sed vitae massa non mauris placerat gravida. Fusce volutpat est vitae tortor vehicula tempor vel non massa. In varius eros diam, eu laoreet sapien luctus sit amet. Aliquam pellentesque, magna sed placerat lobortis, est eros sollicitudin felis, quis scelerisque felis diam vitae dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}



function Profile() {
    return (
        <>
        <div className="profile-grid">
            <div className="griditem1">
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
                    <desctitle>About me</desctitle>
                    <description>
                        {dummyData.description}
                    </description>
                    </div>
                </div>
            <div className="griditem2">
                  <img className="profile-picture" src={pfp} alt="tygrys"/>
                    <div className="userdata">
                    <div className="line1">
                        <p1>{dummyData.username}</p1>
                        <p2>Eco rank {dummyData.ecorank}</p2>
                    </div>
                        <p3>A user since <b>{dummyData.registerDate}</b></p3>
                    </div>                                     
                    <div className="infobox">
                    <desctitle>About me</desctitle>
                    <description>
                        {dummyData.description}
                    </description>
            </div> 
            </div>

            <div className="griditem3">
            <h1>test</h1>
            

            </div>
            </div>
        </>
    )

}



export default Profile;