import {useEffect, useState} from 'react'
import axios from 'axios';

export const useNews = (date) => {
  const [news, setNews] = useState([])
  const [doneData, setDoneData] = useState(true)
  console.log(doneData)

  useEffect(() => {
    if(doneData) {
      const getNews = async () => {
        const options = {
          method: 'GET',
          url: `https://reuters-business-and-financial-news.p.rapidapi.com/article-date/${date}`,
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_REUTER_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_REUTER_API_HOST
          }
        };

        try {
          const response = await axios.request(options);
          // console.log(response.data);
          setNews(response.data)
          setDoneData(false)
        } catch (error) {
          console.error(error);
        }
      }
      getNews()
    }
    

    console.log('useEffect run')
  }, [date])
  
  return {news, doneData}
} 