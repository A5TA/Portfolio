import React, { useState, useEffect } from 'react'
import './portfolio.css'
import IMG1 from '../../assets/Simple-Scribe.jpg'
import IMG2 from '../../assets/rookie_robot.jpg'
import IMG3 from '../../assets/shop-a-reality.jpg'
import IMG4 from '../../assets/spider.png'
import IMG5 from '../../assets/tenzis.jpg'


const data = [
  {
    id: 1,
    image: IMG1,
    title: "SimpleScribe",
    github: "https://github.com/A5TA/Simple-Scribe",
    technology: ['ajax',
      'assemblyai',
      'bootstrap',
      'css',
      'dcp',
      'flask',
      'html',
      'javascript',
      'jquery',
      'python'],
    shown: false
  },
  {
    id: 2,
    image: IMG2,
    title: "RookieRobot",
    github: "https://github.com/A5TA/RookieRobot",
    technology: ['css',
      'flask',
      'google-cloud',
      'google-spreadsheets',
      'html5',
      'python',
      'twitter'],
    shown: false
  },
  {
    id: 3,
    image: IMG3,
    title: "ShopAReality",
    github: "https://github.com/A5TA/ShopAReality",
    technology: ['css',
      'echo3d',
      'flask',
      'python'
      ],
    shown: false
  },
  {
    id: 4,
    image: IMG4,
    title: "Amazon Web-Scraper",
    github: "https://github.com/A5TA/web-scraper",
    technology: ['python', 'scrapy', 'SQlite'],
    shown: false
  },
  {
    id: 5,
    image: IMG5,
    title: "Tenzis Game",
    github: "https://github.com/A5TA/TenzisGame",
    technology: ['React', 'nodeJS', 'HTML', 'css'],
    shown: false
  }
]




const Portfolio = () => {
  const [showTech, setShowTech] = useState([...data])

    // This will rerender the page if the button for the ShowTech is clicked
  useEffect(() => {
  console.log('button clicked')
  },[showTech])

  console.log(showTech[0].shown)
  const projects = data.map(({id,image,title,github,technology}) => {
    return (
      <article key={id} className='portfolio__item'>
        <div className="portfolio__item-image">
          <img src={image} alt={title}/>
        </div>
        <h3>{title}</h3>
        <div className='portfolio__item-CTA'>
          <a href={github} className='btn' target="_blank" rel="noreferrer">Github</a>
          {/* The logic for the button is that the shown variable will be modified when clicked */}
          <button key={id} className='btn btn-primary' onClick={() => setShowTech([...showTech, showTech[id-1].shown = !showTech[id-1].shown])}>
            {showTech[id-1].shown ? 'Hide': 'Show'} Tech
          </button>
        </div>
        {showTech[id - 1].shown === true && <ul className="portfolio_item-tech">
          {technology.map((technology, i) => (
            <li key={i}>{technology.charAt(0).toUpperCase() + technology.slice(1)}</li>
          ))}
        </ul>}
    </article>
    )
  })
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {projects}
      </div>
    </section>
  )
}

export default Portfolio