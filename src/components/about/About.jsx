import React from 'react'
import './about.css'
import ME from '../../assets/me-about.jpg'
import {AiOutlineTrophy} from 'react-icons/ai'
import {RiTeamLine} from 'react-icons/ri'
import {TiFolderOpen} from 'react-icons/ti'

const About = () => {
  return (
    <section id='about'>
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
            <img src={ME} alt="me" className='about__me-img'/>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <AiOutlineTrophy className='about__icon'/>
              <h5>Experience</h5>
              <small>1+ year of Experience</small>
            </article>
            <article className='about__card'>
              <RiTeamLine className='about__icon'/>
              <h5>Leadership</h5>
              <small>1+ year of Experience</small>
            </article>
            <article className='about__card'>
              <TiFolderOpen className='about__icon'/>
              <h5>Projects</h5>
              <small>5+ Completed</small>
            </article>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptas 
            earum vitae rem animinon numquam quidem iusto accusantium, quasi blanditiis maiores 
            vero ab enim fuga unde iste cupiditate explicabo.
          </p>
          <a href="#contact" className='btn btn-primary'>Contact Me</a>
        </div>
      </div>

    </section>
  )
}

export default About