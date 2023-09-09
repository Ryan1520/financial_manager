import axios from "axios";



export const StockList = async () => {
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    params: {
      exchange: 'NASDAQ',
      format: 'json'
    },
    headers: {
      // https://bobbyhadz.com/blog/react-not-reading-env-file-environment-variables#:~:text=If%20you%20get%20undefined%20when,env%20file.
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    }
  };
  
  try {
    const response = await axios.request(options);
    // console.log(response.data.data);
    return response.data.data
  } catch (error) {
    console.error(error);
  }
}