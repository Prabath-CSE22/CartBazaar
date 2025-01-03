import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/home'
import Shop from './pages/shop'
import Profile from './pages/profile'
import Admin from './pages/admindash'
import axios from 'axios'
import ProtectedRoutes from './components/protectedRoutes'
const App = () => {
  axios.defaults.withCredentials = true;
  
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />


          <Route element={<ProtectedRoutes />}>
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <footer class="footer bg-dark text-light py-4">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h5>About Us</h5>
        <p>
          We are dedicated to providing high-quality products and services to meet your needs. 
          Your satisfaction is our priority.
        </p>
      </div>

      <div class="col-md-4">
        <h5>Quick Links</h5>
        <ul class="list-unstyled">
          <li><a href="/" class="text-light">Home</a></li>
          <li><a href="/shop" class="text-light">Shop</a></li>
          <li><a href="/profile" class="text-light">Profile</a></li>
          <li><a href="/contact" class="text-light">Contact Us</a></li>
        </ul>
      </div>

      <div class="col-md-4">
        <h5>Contact Us</h5>
        <ul class="list-unstyled">
          <li>Email: <a href="mailto:support@example.com" class="text-light">support@example.com</a></li>
          <li>Phone: <a href="tel:+1234567890" class="text-light">+1 234 567 890</a></li>
          <li>Address: 123 Business Street, City, Country</li>
        </ul>
      </div>
    </div>
    <hr class="bg-light" />
    <div class="text-center">
      <p class="mb-0">&copy; 2025 YourCompany. All rights reserved.</p>
      <small class="text-muted">Designed with ❤️ by YourCompany.</small>
    </div>
  </div>
</footer>


    </div>
  )
}

export default App