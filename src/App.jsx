import React from 'react'
import Header from './components/header/Header'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Nav from './components/nav/Nav'
import Experience from './components/experience/Experience'
// import Services from './components/services/Services'
// import Testimonials from './components/testimonials/Testimonials'
import Footer from './components/footer/Footer'
import Portfolio from './components/portfolio/Portfolio'

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      {/* <Services /> */}
      <Portfolio />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </>
  )
}

export default App