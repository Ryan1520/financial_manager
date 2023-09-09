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
            'X-RapidAPI-Key': 'ae8f4e898cmsha3f6a23b6ed2698p185c52jsn633b86d1d72d',
            'X-RapidAPI-Host': 'reuters-business-and-financial-news.p.rapidapi.com'
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