import React, {useState, useContext} from 'react'
import './accordion.css'
import { incomeCategories, expenseCategories } from '../../data/categories';
import HistoryList from '../historylist/HistoryList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HistoryIcon from '@mui/icons-material/History';
import {GlobalContext} from '../../context/GlobalState'
import { FilteredHistoryData } from '../../utils/DataDetail';

const Accordion = () => {
  const {transactions} = useContext(GlobalContext)

  const [state, setState] = useState(false)
  
  const [filters, setFilters] = useState({})
  
  const {totalHistory} = FilteredHistoryData(filters)

  //https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/
  const set_categories = [...new Set(transactions.map(t => t.category))]
  const set_filteredCategories = [...new Set(transactions.filter(f => f.type === filters.type).map(t => t.category))]

  const handleFilters = (e) => {
    // https://bobbyhadz.com/blog/react-remove-key-from-state-object#:~:text=%23%20Remove%20a%20Key%20from%20a%20state%20Object%20using%20the%20delete,the%20key%20from%20the%20copy.
    if (e.target.value === 'All'){    
      if (e.target.name === 'type'){
        setFilters(prev =>{
          const {type, ...rest} = prev
          return rest
        })
      }
    } 
    if (e.target.value === 'All'){    
      if (e.target.name === 'category'){
        setFilters(prev =>{
          const {category, ...rest} = prev
          return rest
        })
      }
    } 
    else {
      setFilters({...filters, [e.target.name]: e.target.value})
    }
  }
  // console.log(filters);

  return (
    //https://www.codingnepalweb.com/responsive-accordion-menu-html-css/
    <div className='accordion-container'>
      <input 
      className='input-accordion'
      type="checkbox" 
      name="tab" 
      id="tab" />
      <label 
      className={state ? "label active" : "label"} 
      htmlFor="tab" 
      onClick={() => setState(!state)}>
        <span><HistoryIcon />Transactions history</span>
        <div className={state ? "icon active" : "icon"}>
          <KeyboardArrowDownIcon />
        </div>
      </label>

      <div className={state ? "content active" : "content"}>
        <div className='accordion-filter'>
          <select 
          name="type"
          className='filter-select-box'
          value={filters.type}
          onChange={handleFilters} >
            <option hidden>Type</option>
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select 
          name='category'
          className='filter-select-box'
          onChange={handleFilters} >
            <option hidden>Categories...</option>
            <option value="All">All</option>
            {
              //https://www.freecodecamp.org/news/how-to-check-if-an-object-has-a-key-in-javascript/
              filters.hasOwnProperty('type') === false //check if the dropbox select to 'All'
                ? set_categories.map(i => (<option key={i} value={i}>{i}</option>))
                : set_filteredCategories.map(i => (<option key={i} value={i}>{i}</option>))
            }
          </select>
        </div>
        
        {Object.keys(filters).length === 0 
          ? <HistoryList transactions={transactions} />
          : <HistoryList transactions={transactions} filters={filters}/>
        }   
        <h2 className='accordion-total'>Total($): <span>{totalHistory}</span></h2>
      </div>
    </div>
  )
}

export default Accordion