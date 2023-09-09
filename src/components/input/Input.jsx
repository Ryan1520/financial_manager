import React, {useState, useEffect, useContext} from 'react'
import './input.css'
import { incomeCategories, expenseCategories } from '../../data/categories';
import { GetDate } from '../../utils/ExtractDate';
import { GlobalContext } from '../../context/GlobalState';
import { v4 as uuidv4 } from 'uuid'
import EastIcon from '@mui/icons-material/East';
import { style } from '@mui/system';

const Input = () => {
  const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: '',
  };

  const initialLimit = [
    { category: 'Bills', limit:'100'},
    { category: 'Car', limit:'100'},
    { category: 'Clothes', limit:'100'},
    { category: 'Travel', limit:'100'},
    { category: 'Food', limit:'100'},
    { category: 'Shopping', limit:'100'},
    { category: 'House', limit:'100'},
    { category: 'Entertainment', limit:'100'},
    { category: 'Phone', limit:'100'},
    { category: 'Pets', limit:'100'},
    { category: 'Other', limit:'100' },
  ]
  const [limitExpense, setLimitExpense] = useState(JSON.parse(localStorage.getItem('limits')) || initialLimit)
  const [limitCat, setLimitCat] = useState('Bills')
  const [limitAmount, setLimitAmount] = useState('100')

  const [formInput, setFormInput] = useState(initialState)
  // console.log("Form Input: ", formInput)
  

  const {addTransaction, transactions} = useContext(GlobalContext)

  const [inputNoti, setInputNoti] = useState(false)
  const [allowSubmit, setAllowSubmit] = useState(true)

  // Functions of limit form----------------------
  const handleLimitCat = (e) => {
    setLimitCat(e.target.value)
    // https://contactmentor.com/find-object-in-array-of-objects/?expand_article=1 
    setLimitAmount(limitExpense.find(l => l.category === e.target.value).limit)
  }
  const handleLimitAmount = (e) => {
    setLimitAmount(e.target.value)
  }
  // console.log(limitCat, limitAmount)

  const addLimit = (e) => {
    // refresh after add limit to update chart board => not prevent refresh
    // e.preventDefault()  

    // https://bobbyhadz.com/blog/react-update-object-in-array
    const newLimitExpense = limitExpense.map(l => l.category === limitCat ? {...l, limit: limitAmount} : l) 
    
    setLimitExpense(newLimitExpense)

    localStorage.setItem('limits', JSON.stringify(newLimitExpense));
  }
  // console.log(limitExpense)



  // Functions of input forms----------------------
  const handleInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    })
  }
  // console.log(formInput)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const {day, month, year} = GetDate()

    // Add 'limit' field to 'transactions' if input's type is 'Expense' 
    const transType = e.target.getAttribute('data-type')
    const transCate = e.target.getAttribute('data-category')
    if (transType === '' || transCate === ''){
      console.log('Please Enter Input')
      setAllowSubmit(false)
      setInputNoti(true)
      setTimeout(() => {
        setInputNoti(false)
        setAllowSubmit(true)
        setFormInput(initialState)   
      }, 5000)
      return
    }

    if(transType == 'Expense'){
      //Search for 'limit of input category' in limit data
      const limitAmount = limitExpense.find(e => e.category == transCate).limit
      // console.log(limitAmount)

      // https://stackoverflow.com/questions/73740061/how-to-use-if-condition-inside-an-object-in-react
      addTransaction({
        ...(formInput.date !== '' 
          ? {...formInput,
            amount: Number(formInput.amount),
            limit: Number(limitAmount),
            id: uuidv4()
          } 
          : {...formInput, 
            date: `${year}-0${month}-${day}`,
            amount: Number(formInput.amount),
            limit: Number(limitAmount),
            id: uuidv4()
          }
        )
      })
    } else {
      // https://stackoverflow.com/questions/73740061/how-to-use-if-condition-inside-an-object-in-react
      addTransaction({
        ...(formInput.date !== '' 
          ? {...formInput,
            amount: Number(formInput.amount),
            id: uuidv4()
          } 
          : {...formInput, 
            date: `${year}-0${month}-${day}`,
            amount: Number(formInput.amount),
            id: uuidv4()
          }
        )
      })
    }
    setInputNoti(true)
    setTimeout(() => {
      setInputNoti(false)
      setFormInput(initialState)   
    }, 5000)
  }
  // console.log("Global State:", transactions)

  

  return (
    <div className='input-container'>
      <div className="input-top-img"></div>
      <h1 className='input-title'>Input Section</h1>

      <h3 className='form-title'>Limit Expense</h3>
      <form className='limit-form'>
        <div className="limit-section-wrapper">
          <div className='limit-section'>
            <label htmlFor="limit-cat" className="input-label">Limit of: </label>
            <select 
            className='limit-select-box'
            name='limit-cat' 
            id='limit-cat'
            value={limitCat}
            onChange={handleLimitCat} >
              {
                expenseCategories.map(i => (<option key={i.category} value={i.category}>{i.category}</option>))
              }
            </select>
          </div>
          
          <div className='east-icon'>
            <EastIcon />
          </div>

          <div className='limit-section'>
            <label htmlFor="limit-input" className="input-label">Amount:</label>
            <input 
            type="text" 
            id="limit-input"
            className='limit-input'
            name="limit-amount" 
            placeholder='Amount...'
            value={limitAmount} 
            onChange={handleLimitAmount} />
          </div>
        </div>

        <button className='submit-limit' onClick={addLimit}>ADD LIMIT</button>
      </form>
      

      <h3 className='form-title'>Transaction</h3>
      <form className='input-form' onSubmit={handleSubmit}>
        {
        allowSubmit === true
          ? (<span className={inputNoti ? 'input-noti active' : 'input-noti'}>
            In<b> {formInput.date}</b>,
            <b> {formInput.type}</b> from 
            <b> {formInput.category}</b> just added: 
            <b> $ {formInput.amount}</b>
          </span>) 
          : (<span className={inputNoti ? 'input-noti active' : 'input-noti'} style={{backgroundImage: 'none', backgroundColor:'#FF3D3D'}}>
            Please Enter All Required Input!
          </span>)
        }

        <div className="input-section">
          {/* https://www.freecodecamp.org/news/html-drop-down-menu-how-to-add-a-drop-down-list-with-the-select-element/ */}
          <label htmlFor="type" className="input-label">Type: </label>
          <select 
          name='type' 
          className='input-select-box'
          id='type'
          value={formInput.type}
          onChange={handleInput} >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        
        <div className="input-section">
          <label htmlFor="category" className="input-label">Category: </label>
          <select 
          name='category' 
          className='input-select-box'
          id='category'
          value={formInput.category}
          onChange={handleInput} >
            <option hidden>Categories...</option>
            {
              formInput.type === 'Income'
              ? incomeCategories.map(i => (<option key={i.category} value={i.category}>{i.category}</option>))
              : expenseCategories.map(i => (<option key={i.category} value={i.category}>{i.category}</option>))
            }
          </select>
        </div>

        <input 
        type="text" 
        className='input-text'
        name="amount" 
        placeholder='Amount'
        value={formInput.amount} 
        onChange={handleInput} />
        
        <input 
        type="date" 
        className='input-text date'
        name="date" 
        value={formInput.date} 
        onChange={handleInput} />
        
        <button 
        type='submit' 
        className='submitBtn'
        // https://timmousk.com/blog/react-onclick-pass-parameter/</form>
        data-type={formInput.type}
        data-category={formInput.category} 
        onClick={handleSubmit}>
          ADD TRANSACTION
        </button>
      </form>
    </div>
  )
}

export default Input