import React from 'react'
import FaceDetection from './pages/VideoAnalyzer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import VideoAnalyzer from './pages/VideoAnalyzer'
import AudioAnalyzer from './pages/AudioAnalyzer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ContactUs from './pages/ContactUs'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import "./index.css"
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import useAuthStore from './store/authStore'

const App = () => {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/video-analyzer" element={user ? <VideoAnalyzer /> : <Navigate to="/login" />} />
        <Route path='/audio-analyzer' element={user ? <AudioAnalyzer /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
      </Routes>
    </Router>
  )
}

export default App