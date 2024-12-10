import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
// import ProtectedRoutes from '../utills/protectedRoutes'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
