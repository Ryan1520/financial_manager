import React from 'react'
import './flip_card.css'
import Input from '../input/Input'
import Abstract from '../abstract/Abstract'

const Flip_card = ({flip}) => {
  // https://codepen.io/Ossoona/pen/GJmvmJ?editors=0100
  return (
    <div className='flip-container' id="flip">
      <div className={flip === true ? 'flip-card flipped' : 'flip-card'}>
        <div className='front face'>
          <Abstract />
        </div>
        <div className='back face'>
          <Input />
        </div>
      </div>
    </div>
  )
}

export default Flip_card