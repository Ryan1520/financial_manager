import React from 'react'
import History from '../history/History';
import './historylist.css'
import { FilteredHistoryData } from '../../utils/DataDetail';

const HistoryList = ({transactions, filters}) => {
  const {filteredHistory} = FilteredHistoryData(filters)

  return (
    <div className='history-wrapper'>
      {
        //https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
        filteredHistory.length === 0 
          ? transactions.map(t => (<History key={t.id} transaction = {t} />))
          : filteredHistory.map(ft => (<History key={ft.id} transaction = {ft} />))
      }
    </div>
  )
}

export default HistoryList