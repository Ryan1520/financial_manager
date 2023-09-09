import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import { incomeCategories, expenseCategories } from '../data/categories';


// https://bobbyhadz.com/blog/react-export-multiple-functions
export const ProcessData = (type) => {
  const { transactions } = useContext(GlobalContext)
  const filteredTransactions = transactions.filter(t => t.type === type)
  const totalInType = filteredTransactions.reduce((acc, prevValue) => acc + prevValue, 0)
  const referenceColors = type === 'Income' ? incomeCategories : expenseCategories
  // console.log(filteredTransactions)

  const categories = []
  // https://bobbyhadz.com/blog/javascript-array-not-includes
  filteredTransactions.forEach(t => !categories.includes(t.category) && categories.push(t.category))
  // console.log(categories)

  const amounts = []
  const colors = []
  for (let i = 0; i < categories.length; i++){
    // https://www.slingacademy.com/article/javascript-ways-to-calculate-the-sum-of-an-array/
    amounts[i] = filteredTransactions.reduce((sum, currValue) => sum += currValue.category === categories[i] ? currValue.amount : 0, 0)

    // https://bobbyhadz.com/blog/javascript-find-first-array-element-matching-condition
    colors[i] = referenceColors.find(c => c.category === categories[i]).color
  }
  // console.log(amounts, colors)

  const chartData = {
    labels: categories,
    datasets: [{
      data: amounts, 
      backgroundColor: colors,
    }]
  }
  return {chartData, totalInType}
}

export const FilteredHistoryData = (filters) => {
  const { transactions } = useContext(GlobalContext)

  let filteredHistory = []
  let totalHistory = 0

  if(filters && Object.keys(filters).length > 0) {
    filteredHistory = transactions.filter(t => (
      Object.entries(filters).every(([key, value]) => t[key] === value)
    ))
    totalHistory = filteredHistory.reduce((acc, prev) => acc += prev.type === 'Income' ? prev.amount : -(prev.amount), 0)
  } else {
    totalHistory = transactions.reduce((acc, prev) => acc += prev.type === 'Income' ? prev.amount : -(prev.amount), 0)
  }
  // console.log(filters, filteredHistory, transactions, totalHistory)

  return {filteredHistory, totalHistory}
}

export const AbstractData = () => {
  const { transactions } = useContext(GlobalContext)

  let data = [0, 0]
  transactions.forEach(t => t.type === 'Income' ? data[0] += t.amount : data[1] += t.amount)
  // transactions.forEach(t => console.log(t.type))

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: data, 
      backgroundColor: ['#14FF56', '#FF1414']
    }]
  }
  // console.log(data);
  return { chartData, income: data[0], expense: data[1] }
}

export const BarData = () => {
  const { transactions } = useContext(GlobalContext)

  const date = new Date()
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const latestMonths = []
  let m, y

  for (let i = 5; i >= 0 ; i--){
    if(month - i <= 0){
      m = '0' + (12 + (month - i))
      y = '' + (year - 1)
    } else {
      m = '0' + (month - i)
      y = '' + (year)
    }

    latestMonths.push({month: m, year: y})
  }
  
  const newTransactions = transactions.map(t => ({...t, month: t.date.split('-')[1], year: t.date.split('-')[0]}))

  const expenses = newTransactions.filter(t => t.type=== 'Expense')
  const incomes = newTransactions.filter(t => t.type === 'Income')

  const expenseBarData = []
  const incomeBarData = []

  latestMonths.forEach(({month, year}, index) => {
    const filteredExpenses = expenses.filter(e => e.month === month && e.year === year)
    const filteredIncomes = incomes.filter(i => i.month === month && i.year === year)

    if (filteredExpenses.length > 0){
      expenseBarData[index] = filteredExpenses.reduce((acc, prev) => acc += prev.amount, 0)
    } else {
      expenseBarData[index] = 100
    }
    if (filteredIncomes.length > 0){
      incomeBarData[index] = filteredIncomes.reduce((acc, prev) => acc += prev.amount, 0)
    } else {
      incomeBarData[index] = 100
    }
  })

  
  const barData = {
    labels: latestMonths.map(l => l.month + '/' + l.year),
    datasets: [{
      label: 'Income',
      data: incomeBarData, 
      backgroundColor: '#14FF18'
    }, {
      label: 'Expense',
      data: expenseBarData, 
      backgroundColor: '#FF1414'
    }]
  } 
  return {barData, incomeBarData, expenseBarData, expenses, incomes, latestMonths}
}