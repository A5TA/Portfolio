import React from 'react'
import './about.css'
import ME from '../../assets/me-test.png'
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
              <small>2+ year of Experience</small>
            </article>
            <article className='about__card'>
              <TiFolderOpen className='about__icon'/>
              <h5>Projects</h5>
              <small>5+ Completed</small>
            </article>
          </div>
          <p>Hello! my name is Brandon, and I enjoy designing and developing online applications. 
            I knew what I wanted to pursue with the rest of my life the moment I coded my first hello 
            world. This year, I've participated in four hackathons, and my passion for coding has grown 
            even more as a result of working with other like-minded individuals. I learned how to cooperate 
            with people and solve problems more efficiently and effectively in fast-paced environments.
          </p>
          <p>
          I began learning React in June 2022, and my web development skills have skyrocketed as a result. 
          I am always trying to learn new technologies, and I am seeking internship opportunities for the summer of 2023.
          </p>
          <a href="#contact" className='btn btn-primary'>Contact Me</a>
        </div>
      </div>

    </section>
  )
}

export default About
