import React, {useState, useRef} from 'react'
import {Link} from 'react-scroll'
import './App.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Input from './components/input/Input';
import Detail from './components/detail/Detail';
import Abstract from './components/abstract/Abstract';
import Sidebar from './components/sidebar/Sidebar';
import Flip_card from './components/flip_card/Flip_card';
import ChartBoard from './components/chartboard/ChartBoard';
import MarketBoard from './components/marketboard/MarketBoard';
import NewsBoard from './components/newsboard/NewsBoard';

function App() {
  const [sideClose, setSideClose] = useState(true)  //Sidebar state
  const [flip, setFlip] = useState(false)   //Flip state

  return (
    <div className="App">
      <Sidebar sideClose={sideClose} setFlip={setFlip} />
      <div className={sideClose === true ? 'app-wrapper full' : 'app-wrapper'}>
        <div 
        className='app-icon' 
        // https://bobbyhadz.com/blog/react-toggle-boolean-state
        onClick={() => setSideClose(prev => !prev)}>
          {sideClose ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
        </div>

        {/* https://stackoverflow.com/questions/54784885/css-scroll-snap-isnt-working-on-divs-in-react-app */}
        <Flip_card flip={flip}/>
        <ChartBoard />
        <MarketBoard />
        <NewsBoard />
      </div>
    </div>
  );
}

export default App;
