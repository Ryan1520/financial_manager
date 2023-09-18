import {useState, useEffect} from 'react'
import axios from 'axios'

// https://dev.to/shaedrizwan/building-custom-hooks-in-react-to-fetch-data-4ig6
export const useAPI = (yahoo_url, twelve_url, lists, results) => {
  // const [error,setError] = useState(null)
  // const [loading,setLoading] = useState(false)
  const [data,setData] = useState([])

  useEffect(() => {
    const getData = async() => {
      const quote_options = {
        method: 'GET',
        url: yahoo_url,
        params: {
          symbol: lists.join(',')
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_YAHOO_API_HOST
        }
      };

      try {
        // https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch
        const quote_res = await axios.request(quote_options);
        const price_res = await Promise.all(lists.map(async symb => {
          const options = {
            method: 'GET',
            url: twelve_url,
            params: {symbol: symb},
            headers: {
              // https://bobbyhadz.com/blog/react-not-reading-env-file-environment-variables#:~:text=If%20you%20get%20undefined%20when,env%20file.
              'X-RapidAPI-Key': process.env.REACT_APP_TWELVE_API_KEY,
              'X-RapidAPI-Host': process.env.REACT_APP_TWELVE_API_HOST
            }
          }
          const response = await axios.request(options)
          return response.data
        }))
        // console.log(response.data);
        const quote_data = quote_res.data
        const price_data = price_res
        setData([...quote_data, ...price_data])
      } catch (error) {
        console.error(error);
      }
    }
    
    getData()
  
    // return {data, error, loading}  //---> WRONG 
  }, [results, lists])

  let allData = []
  if(data.length === lists.length * 2) {
      for (let i = 0; i < lists.length; i++) {
        allData = [...allData, {
          symbol: data[i].symbol,
          name: data[i].longName,
          percent_change: data[i].regularMarketChangePercent,
          price: data[i].regularMarketPrice,
          // logo: data[i + lists.length].url || ''
        }]
      }
  }

  console.log(allData)
  return { allData }
}