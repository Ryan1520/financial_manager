import React, {useContext} from 'react'
import './abstract.css'
import { GlobalContext } from '../../context/GlobalState'
import { DoughnutChart } from '../chart/Chart'
import { AbstractData } from '../../utils/DataDetail'
import Accordion from '../accordion/Accordion'


const Abstract = () => {
  const {balance} = useContext(GlobalContext)

  const {chartData, income, expense} = AbstractData()
  const percentage = (expense/income*100).toFixed(2)
  
  return (
    <div className='abstract-container'>
      <div className='top-img'></div>
      <div className="balance">
        <div className='balance-info'>
          <img className='balance-logo' src="https://i.ibb.co/McZDy9p/budget-balance.png" alt="" />
          <h2>Balance: </h2>
        </div>
        <h1>$ {balance}</h1>
      </div>
      <div className='abstract-details'>
        <div className='chart'>
          <div className="chart-ratio">
            {/* https://stackoverflow.com/questions/12548857/multiple-conditions-in-ternary-conditional-operator */}
            <h1>Ratio( E/I ): 
              <span style={percentage <= 60 
              ? {backgroundColor:'#59FC40'} 
              : (percentage>60 && percentage<=80) 
              ? {backgroundColor:'#FFE32D'} 
              : {backgroundColor:'#FF3838'}}>
                {percentage}%
              </span>
            </h1>
            <h6>E/I less than 60% recommended</h6>
          </div>
          <DoughnutChart data={chartData} />
        </div>
        <div className='list'>
          <Accordion />
        </div>
      </div>
    </div>
  )
}

export default Abstract