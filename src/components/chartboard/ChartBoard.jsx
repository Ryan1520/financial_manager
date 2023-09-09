import React, {useContext, useState} from 'react'
import './chartboard.css'
import { ProcessData, BarData } from '../../utils/DataDetail'
import { DoughnutChart, BarChart } from '../chart/Chart'
import BudgetCard from '../budget_card/BudgetCard'
import ExpenseTable from '../expense_table/ExpenseTable'
import { expenseCategories } from '../../data/categories'
import { GlobalContext } from '../../context/GlobalState'


const ChartBoard = () => {
  const {transactions, deleteTransaction} = useContext(GlobalContext)
  const income_chart = ProcessData('Income').chartData
  const expense_chart = ProcessData('Expense').chartData
  const {incomeBarData, expenseBarData, barData, latestMonths} = BarData()
  // console.log(expenseBarData)

  const [tableCat, setTableCat] = useState('Bills')
  const [popUp, setPopUp] = useState(false)


  const expense_data = expenseCategories.map(e => {
    // https://bobbyhadz.com/blog/javascript-check-if-array-contains-object
    if(transactions.some(t => t.category === e.category)){
      return {...e, amount: transactions.reduce((acc, prev) => acc += prev.category === e.category ? prev.amount : 0, 0)}
    } else {
      return e
    }
  })
  // console.log(expense_chart_data);

  const budget_data = JSON.parse(localStorage.getItem('limits'))
  // console.log(budget_data);

  return (
    <div className='chartboard-container' id='details'>
      <div className='income-chart'>
        <DoughnutChart data={income_chart} />
      </div>
      <div className='expense-chart'>
        <DoughnutChart data={expense_chart} />
      </div>
      <div className='budget-chart'>
        <div className='budget-wrapper'>
          {
            expense_data.map(e => (
              <BudgetCard
              setPopUp={setPopUp} 
              key={e.category} 
              expense={e} 
              setTableCat={setTableCat} 
              budget={budget_data.find(b => b.category === e.category).limit} />
            ))
          }
        </div>
      </div>

      {popUp && <ExpenseTable 
        onClickOutside = {() => {setPopUp(false)}}
        setPopUp={setPopUp}
        tableData={transactions.filter(t => t.category === tableCat)} 
        tableCat={tableCat} 
        deleteTransaction={deleteTransaction}
      />}

      <div className='bar-chart'>
        <BarChart data={barData} />
      </div>
    </div>
  )
}

export default ChartBoard