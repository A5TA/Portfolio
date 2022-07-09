import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import {SiDevpost} from 'react-icons/si'

const HeaderSocials = () => {
  return (
    <div className="header__socials">
        <a href="https://www.linkedin.com/in/brandon-cardillo" target="_blank" rel="noreferrer"><BsLinkedin/></a>
        <a href="https://github.com/A5TA" target="_blank" rel="noreferrer"><BsGithub/></a>
        <a href="https://devpost.com/crusherbrandon" target="_blank" rel="noreferrer"><SiDevpost/></a>
    </div>
  )
}

export default HeaderSocials