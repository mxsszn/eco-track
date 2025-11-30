import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family="SF Pro Text";
ChartJS.defaults.scales.linear.display = true;
ChartJS.defaults.scales.category.grid = {
  display: false,
}





function getProfileData() {

}

const options = {  
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};


const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        borderRadius: 15,
        label: 'ECO Points earned',
        data: [12, 19, 3, 5, 2, 3, 10],
        borderWidth: 1,
        backgroundColor: '#DB5375', 

      }]}


function ProfileChart () {

  return(
    <Bar options={options} data={data} />
  )

}


export default ProfileChart;