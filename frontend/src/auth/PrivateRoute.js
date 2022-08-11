import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { isAuthenticated } from '.'

function PrivateRoute({component:Component,...rest}) {
  return isAuthenticated()? <Outlet/>:<Navigate to='/signin'/> 
}

export default PrivateRoute