import React, {useContext} from 'react'
import { ProcessData } from '../../utils/DataDetail'
import {DoughnutChart} from '../chart/Chart'

const Detail = () => {
  const {chartData, totalInType} = ProcessData('Expense')
  console.log(chartData)

  return (
    <div>
      <DoughnutChart data={chartData} />
    </div>
  )
}

export default Detail