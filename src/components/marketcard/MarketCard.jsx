import React from 'react'
import './marketcard.css'
import Img from '../../assets/nasdaq-logo.png'
import {Add, ArrowUpward, ArrowDownward} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'

const MarketCard = ({stock: {symbol, name, percent_change, price}, lists, setLists}) => {

  const handleDelete = () => {
    const filLists = lists.filter(l => l !== symbol)
    localStorage.setItem('results', JSON.stringify([...filLists]));
    setLists(filLists)
  }

  return (
    <div className='stock-card'>
      <div className="stockcard-top">
        <div className="stock-name">
          <h2>{symbol}</h2>
          <h6>{name}</h6>
        </div>
        <div className="stock-logo" onClick={handleDelete}>
          {/* <img src={logo} alt="abc" /> */}
          <DeleteIcon />
        </div>
      </div>
      <div className="stockcard-bottom">
        <div className='stockcard-price'>
          <div>
            <span>
              {percent_change > 0 
              ? <ArrowUpward sx={{fontSize: "30px", color:"green"}} />
              : <ArrowDownward sx={{fontSize: "30px", color:"red"}} />
              }
            </span>
            <span>
              {percent_change.toFixed(2)}%
            </span>
          </div>
          <div>${price.toFixed(2)}</div>
        </div>
        <div className='stockcard-estimate'>
          <h5>Future Estimate</h5>
          <ul>
            <li>Earnings(low-high): <span>1.26 - 1.35</span></li>
            <li>Price(low-high): <span>136 - 220</span></li>
            <li>Recommendation: <span>strong_buy</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MarketCard