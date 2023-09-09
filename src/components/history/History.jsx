import React, {useContext} from 'react'
import './history.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from '../../context/GlobalState';

const History = ({transaction: {id, type, category, amount, date}}) => {
  const {transactions, deleteTransaction} = useContext(GlobalContext)
  const handleDelete = (id) => {
    deleteTransaction(id)
  }
  // console.log(transactions)
  
  return (
    <div className='history-card'>
      <div className='symbol'>
        {type === 'Income' ? <AttachMoneyIcon sx={{color:'green', fontSize:'40px'}}/> : <MoneyOffIcon sx={{color:'red', fontSize:'40px'}} />}
      </div>
      <div className='history-info'> 
        <h3>{category}</h3>
        <span className='amount'>$ {amount}</span>
        <span className='date'>{date}</span>
      </div>
      <div className='delete' onClick={() => handleDelete(id)}>
        <DeleteIcon />
      </div>
    </div>
  )
}

export default History