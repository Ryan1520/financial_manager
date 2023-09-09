import React from 'react'
import './sidebar.css'
import {Link} from 'react-scroll'

const Sidebar = ({sideClose, setFlip}) => {
  return (
    // https://www.codingnepalweb.com/sidebar-menu-html-css-javascript/
    <div className={sideClose ? 'sidebar-container' : 'sidebar-container open'}>
      <div className="sidebar-top">
        <img src="https://i.ibb.co/4gQtfvH/logo-finance.png" alt="logo-finance" />
        <h1 className='sidebar-title'>Money Manager</h1>
      </div>

      <div className="sidebar-bottom">
        {/* https://www.youtube.com/watch?v=QzW03hyw_bU */}
        <Link to="flip" spy={true} smooth={true} offset={0} duration={500}>
          <h3 className='sidebar-item' onClick={() => setFlip(false)}>Balance</h3>
        </Link>

        <Link to="flip" spy={true} smooth={true} offset={0} duration={500}>
          <h3 className='sidebar-item' onClick={() => setFlip(true)}>Input</h3>
        </Link>

        <Link to="details" spy={true} smooth={true} offset={0} duration={500} >
          <h3 className='sidebar-item'>Details</h3>
        </Link>

        <Link to="market" spy={true} smooth={true} offset={0} duration={500} >
          <h3 className='sidebar-item'>Stock Market</h3>
        </Link>

        <Link to="news" spy={true} smooth={true} offset={0} duration={500} >
          <h3 className='sidebar-item'>Hightlighted News</h3>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar