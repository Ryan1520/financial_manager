import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'

//Fixed 'arc' error: https://stackoverflow.com/questions/70098392/react-chartjs-2-with-chartjs-3-error-arc-is-not-a-registered-element
import {
  Chart, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement} from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);



// https://www.chartjs.org/docs/latest/charts/doughnut.html

export const DoughnutChart = ({data}) => {
  return (
    <div style={{width: '70%'}}>
      <Doughnut data={data} />
    </div>
  )
}

// https://www.youtube.com/watch?v=GVQ2gXGGREM
export const BarChart = ({data}) => {
  // https://devsheet.com/code-snippet/Hide-gridlines-in-Chartjs/#:~:text=If%20you%20want%20to%20hide,properties%20on%20the%20x%2Daxis.
  const options = {
    scales: {
      x: {
         grid: {
            display: false
         }
      },
    }
  }

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center',
    }}>
      <Bar options={options} data={data} />
    </div>
  )
}



