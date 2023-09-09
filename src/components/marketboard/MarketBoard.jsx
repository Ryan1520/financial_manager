import React, {useEffect, useState, useMemo} from 'react'
import './marketboard.css'
import axios from 'axios'
import MarketCard from '../marketcard/MarketCard'
import { StockList } from '../../requestMethod'
import { useTwelveData } from '../../hooks/useTwelveData'
import {useYahoo} from '../../hooks/useYahoo'
import { usePrice } from '../../hooks/usePrice'
import { useAPI } from '../../hooks/useAPI'
import Img from '../../assets/nasdaq-logo.png'
import {Add, ArrowUpward, ArrowDownward} from '@mui/icons-material';

const MarketBoard = () => {
  const [stock, setStock] = useState('')
  const [results, setResults] = useState('')
  const [lists, setLists] = useState(JSON.parse(localStorage.getItem('results')) || ['MSFT', 'AAPL', 'GOOGL'])
  
  // const lists = JSON.parse(localStorage.getItem('results')) || ['MSFT', 'AAPL', 'GOOGL']
  const symbols = lists.join(',')  // https://bobbyhadz.com/blog/javascript-convert-array-to-comma-separated-string


  // const {data:stockPrice} = useTwelveData('https://twelve-data1.p.rapidapi.com/price', lists, results)
  // const {data:stockPrice} = usePrice(lists, results)
  // console.log(lists, stockPrice)


  // const {data:stockLogo} = useTwelveData('https://twelve-data1.p.rapidapi.com/logo', lists, results)
  // console.log(lists, stockLogo)


  // const {data:stockQuote} = useTwelveData('https://twelve-data1.p.rapidapi.com/quote', lists, results)
  // const {data:stockQuote} = useYahoo('https://mboum-finance.p.rapidapi.com/qu/quote', symbols, results)
  // console.log(lists, stockQuote)


  // const {allData: stockData} = useAPI('https://mboum-finance.p.rapidapi.com/qu/quote', 'https://twelve-data1.p.rapidapi.com/logo',  lists, results)
  // console.log(lists, stockData)


  const handleSubmit = () => {
    if(lists.includes(stock)){
      setStock('')
      return
    }
    setResults(stock)
    setStock('')
    setLists(prev => [...prev, stock])
    localStorage.setItem('results', JSON.stringify([...lists, stock]));
  }


  return (
    <div className='marketboard-container' id='market'>
      <div className="marketboard-top">
        <div className='left'>
          <a className='nasdaq-link' target="_blank" href="https://www.nasdaq.com/market-activity/stocks/screener" >
            <button>
              <div className="nasdaq-logo">
                <img src={Img} alt="" />
              </div>
              <span>Find Stock Symbols</span> 
            </button>
          </a>
          <div className="stock-input-wrapper">
            <input 
            type="text" 
            id="stock-input"
            // className='limit-input'
            placeholder='Input Stock...'
            value={stock} 
            onChange={(e) => setStock(e.target.value)} />
            <button onClick={handleSubmit}><Add sx={{fontSize: '30px'}}/></button>
          </div>
        </div>

        <div className='right'>
          <h3>Total:</h3>
          <h1>$ 1234</h1>
        </div>
      </div>

      <div className="marketboard-bottom">
        {/* {
          stockData &&
          stockData.map(data => (
            <MarketCard key={data.symbol} stock={data} setLists={setLists} lists={lists}/>
          )) 
        } */}
        <div className='stock-card'>
          <div className="stockcard-top">
            <div className="stock-name">
              <h2>AAPL</h2>
              <h6>Apple Inc.</h6>
            </div>
            <div className="stock-logo">
              <img src="https://api.twelvedata.com/logo/apple.com" alt="abc" />
            </div>
          </div>
          <div className="stockcard-bottom">
            <div className='stockcard-price'>
              <div>
                <span>
                  <ArrowUpward sx={{fontSize: "30px", color:"green"}}/>
                </span>
                <span>
                  +2.21%
                </span>
              </div>
              <div>$123.89</div>
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
      </div>
    </div>
  )
}

export default MarketBoard