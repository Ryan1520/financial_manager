import {useState, useEffect} from 'react'
import axios from 'axios'

// https://dev.to/shaedrizwan/building-custom-hooks-in-react-to-fetch-data-4ig6
export const useYahoo = (url, symbols, results) => {
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState([])

  useEffect(() => {
    // const getData = async() => {
    //   const options = {
    //     method: 'GET',
    //     url: url,
    //     params: params,
    //     headers: {
    //       // https://bobbyhadz.com/blog/react-not-reading-env-file-environment-variables#:~:text=If%20you%20get%20undefined%20when,env%20file.
    //       'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    //       'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    //     }
    //   };

    //   try{
    //     setLoading(true)
    //     const response = await axios.request(options);
    //     setData(response.data)
    //   }catch(err){
    //     setError(err)
    //   }finally{
    //     setLoading(false)
    //   }
    // }

    const getData = async() => {
      const options = {
        method: 'GET',
        url: url,
        params: {
          symbol: symbols
        },
        headers: {
          'X-RapidAPI-Key': 'ae8f4e898cmsha3f6a23b6ed2698p185c52jsn633b86d1d72d',
          'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
        }
      };

      try {
        setLoading(true)
        const response = await axios.request(options);
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    
    getData()

    // return {data, error, loading}  //---> WRONG 
  }, [results])

  // console.log(data)
  return { data }
}