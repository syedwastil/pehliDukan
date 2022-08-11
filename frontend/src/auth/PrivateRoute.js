import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { isAuthenticated } from '.'

function PrivateRoute() {
  return isAuthenticated()? <Outlet/>:<Navigate to='/signin'/> 
}

export default PrivateRoute