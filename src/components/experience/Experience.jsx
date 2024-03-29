import React from 'react'
import './experience.css'
import {BiChevronRightCircle} from 'react-icons/bi'

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What is my</h5>
      <h2>Experience</h2>
      <div className="container experience__container">
        <div className="experience__frontend">
          <h3>Frontend Development</h3>
          <div className="experience__content">

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>HTML</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>CSS</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>Tailwind CSS</h4>
                <small className='text-light'>Familiar</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>Javascript</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>Bootstrap</h4>
                <small className='text-light'>Familiar</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>React</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>
        <div className="experience__backend">
          <h3>Backend Development</h3>
          <div className="experience__content">

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>Python</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>Node JS</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>SQLite</h4>
                <small className='text-light'>Basic</small>
              </div>
            </article>

            <article className='experience__details'>
              <BiChevronRightCircle className="experience__details-icon"/>
              <div>
                <h4>C</h4>
                <small className='text-light'>Basic</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience