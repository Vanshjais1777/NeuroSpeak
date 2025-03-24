import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import KeyFeatures from '../components/KeyFeatures'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home;