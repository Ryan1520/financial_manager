import React, {useState} from 'react'
import './newsboard.css'
import { useNews } from '../../hooks/useNews'
import reuter from '../../assets/reuter-logo.png'
import yahoo from '../../assets/yh-finance-logo.png'
import { GetDate } from '../../utils/ExtractDate'

const NewsBoard = () => {
  const [fetch, setFetch] = useState(true)
  const [newsCat, setNewsCat] = useState('all')

  const {day, month, year} = GetDate()
  let date = ''
  if (day < 10) date = `${year}-${month}-0${day}`
  if (month < 10) date = `${year}-0${month}-${day}`
  if (day < 10 && month < 10) date = `${year}-0${month}-0${day}`

  // const {news, doneData} = useNews(date)
  // doneData === false && console.log(news, doneData)

  return (
    <div className='newsboard-container' id='news'>
      <div className="newsboard-top">
        <div className="left">
          <button className={newsCat === 'all' ? "all-btn active" : "all-btn"} onClick={() => setNewsCat('all')}>All News</button>
          <button className={newsCat === 'filter' ? "filter-btn active" : "filter-btn"} onClick={() => setNewsCat('filter')}>Your Stock's News</button>
        </div>
        <div className='right'>
          <img src={reuter} alt="Reuter.com" />
          <img src={yahoo} alt="Yahoo Finance" />
        </div>
      </div>

      <div className="newsboard-bottom">
        {/* { doneData === false && 
          news.map(n => (
            <div className='news-card'>
              <div className="top">
                <img src={n.files[0] ? n.files[0].urlCdn : reuter} alt="Card Image" />
              </div>
              <div className='center'>
                <h6>{n.minutesToRead} minutes read</h6>
                <h3>{n.articlesName}</h3>
              </div>
              <a 
              href={`https://www.reuters.com/${n.urlSupplier}`} 
              target='_blank' 
              className="bottom">
                <button>Read Full Article </button>
              </a>
            </div> 
          ))
        } */}
      </div>
    </div>
  )
}

export default NewsBoard