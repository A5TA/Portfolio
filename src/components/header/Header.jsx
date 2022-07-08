import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.png'
import HeaderSocials from './HeaderSocials'
import {IoArrowDownCircle} from 'react-icons/io5'

const Header = () => {
  return (
    <header id='home'>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Brandon Cardillo</h1>
        <h5 className="text-light">
          Software Engineer
        </h5>
        <CTA />
        <HeaderSocials />
        <div className="me">
          <img src={ME} alt="me" />
        </div>

        
        <a href="#contact" className='scroll__down'><IoArrowDownCircle size="25px"/></a>
      </div>
    </header>
  )
}

export default Header