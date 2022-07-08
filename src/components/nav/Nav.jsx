import React from 'react'
import './nav.css'
import {VscHome} from 'react-icons/vsc'
import {TbUserSearch} from 'react-icons/tb'
import {TbBook2} from 'react-icons/tb'
import {ImBooks} from 'react-icons/im'
import {TbMessageCircle} from 'react-icons/tb'
import { useState } from 'react'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')

  return (
    <nav>
      <a href="#home" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active': ''}><VscHome/></a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active': ''}><TbUserSearch/></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active': ''}><TbBook2/></a>
      <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active': ''}><ImBooks/></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active': ''}><TbMessageCircle/></a>
    </nav>
  )
}

export default Nav