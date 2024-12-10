import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const protectedRoutes = () => {
  const user = null;  
  return user ? <Outlet /> : <Navigate to="/" />
}

export default protectedRoutes
