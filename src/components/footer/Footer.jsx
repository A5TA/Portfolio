import React from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import {SiDevpost} from 'react-icons/si'


const Footer = () => {
  return (
    <footer>
      <a href="#home" className='footer__logo'>Brandon</a>

      <ul className='permalinks'>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/brandon-cardillo" target="_blank" rel="noreferrer"><BsLinkedin/></a>
        <a href="https://github.com/A5TA" target="_blank" rel="noreferrer"><BsGithub/></a>
        <a href="https://devpost.com/crusherbrandon" target="_blank" rel="noreferrer"><SiDevpost/></a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Brandon's Portfolio. All rights reserved</small>
      </div>
    </footer>
  )
}

export default Footer