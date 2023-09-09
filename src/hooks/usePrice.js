import {useState, useEffect} from 'react'
import axios from 'axios'

// https://dev.to/shaedrizwan/building-custom-hooks-in-react-to-fetch-data-4ig6
export const usePrice = (lists, results) => {
  // const [data,setData] = useState(null)
  // const [error,setError] = useState(null)
  // const [loading,setLoading] = useState(false)

  const [data,setData] = useState([])
  useEffect(() => {
    const getData = async() => {
      try{
        // setLoading(true)

        // https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
        const res = await Promise.all(lists.map(async symb => {
          const options = {
            method: 'GET',
            url: `https://realstonks.p.rapidapi.com/${symb}`,
            headers: {
              // https://bobbyhadz.com/blog/react-not-reading-env-file-environment-variables#:~:text=If%20you%20get%20undefined%20when,env%20file.
              'X-RapidAPI-Key': 'ae8f4e898cmsha3f6a23b6ed2698p185c52jsn633b86d1d72d',
              'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
            }
          }
          const response = await axios.request(options)
          return response.data
        }))
        // console.log(res)
        setData(res)
      }catch(err){
        // setError(err)
        console.log(err)
      }finally{
        // setLoading(false)
      }
    }
    
    getData()

    // return {data, error, loading}  //---> WRONG 
  }, [results])

  console.log(data)
  return { data }
}