import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Home from './pages/home'
import Shop from './pages/shop'
import Profile from './pages/profile'
import axios from 'axios'

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App