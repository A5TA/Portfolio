import React from 'react'
import './contact.css'


const Contact = () => {
  const email = 'bc1505@mynsu.nova.edu'
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <p>
          I am always on the lookout for any new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I’ll try my best to get back to you!
        </p>

        <a className='btn' href={`mailto:${email}`}>
          Say Hello
        </a>
      </div>
    </section>
  )
}

export default Contact