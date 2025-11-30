import pfp from "./testimg1.jpg"
const dummyUser = {
    pfplink: pfp,
    displayName : "testUser",
    ecorank: 5,
    userId : "1",
    totalEP: "1040",
    weekEP: "134",
    CO2Disp: "560g"
}


function LeaderboardEntry(picture, username, ecorank, totalpoints, weeklypoints, weeklyco2) {

    return(
                <>
                <div className="entryParent">
                    <div className="leaderboardTop">
                        <img src={pfp} class="leaderboard-pfp" alt="tygrynio"></img>
                        <div className="username">{dummyUser.displayName}</div>
                        <div className="ecorank">Eco Rank {dummyUser.ecorank}
                        <div className="totalEP">EP: {dummyUser.totalEP}</div>
                        </div>
                    </div>
                    <div className="leaderboardBottom">
                        Eco Points Earned: {dummyUser.weekEP}  <br/>
                        CO2 Displaced: {dummyUser.CO2Disp}
                    </div>
                </div>
        </>

    )
}

function getLeaderboardEntry() {
    const dummyUser = {
    pfplink: pfp,
    displayName : "testUser",
    ecorank: 5,
    userId : "1",
    totalEP: "1040",
    weekEP: "134",
    CO2Disp: "560g"

}
}





const Test = () => {
    const entryArray = [] 

    for (let i=0; i<6; i++) {
        entryArray.push(<LeaderboardEntry/>)
    }

    return (
        entryArray
    )
}


function test2() {

    return (
        <h1>gello</h1>
    )
}





function Leaderboard() {

return (
    <>
        <Test/>
    </>

)

}




export default Leaderboard;