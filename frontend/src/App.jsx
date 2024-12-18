import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import axios from 'axios'

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App