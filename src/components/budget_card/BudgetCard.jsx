import React, {useEffect} from 'react'
import './budgetcard.css'

const BudgetCard = ({expense: {category, amount}, budget, setTableCat, setPopUp}) => {

  const ratio = amount/budget*100 < 100 ? amount/budget*100 : 100
  // console.log(ratio)
  // https://spacejelly.dev/posts/how-to-create-css-custom-properties-that-dynamically-update-with-react-javascript/
  
  return (
    <div className='budget-card'>
      <div className='top-card'>
        <h2>{category}</h2>
        <h4>Budget: $ {budget}</h4>
      </div>
      <div className="middle-card">
        <div className='budget-bar'>
          {/* https://stackoverflow.com/questions/64671325/how-do-i-set-the-width-of-a-component-in-my-react-web-app-based-off-the-output-o */}
          {ratio > 20 && <div className={ratio > 70 ? 'expense-bar red':'expense-bar'} style={{ width: `${ratio}%` }}>$ {amount}</div>}
        </div>
      </div>
      <div className="bottom-card">
        <button onClick={() => {setTableCat(category); setPopUp(true)}}>Show Expenses</button>
      </div>
    </div>
  )
}

export default BudgetCard