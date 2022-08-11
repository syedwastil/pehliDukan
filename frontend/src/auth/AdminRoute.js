import React from 'react'
import { isAuthenticated } from '.'
import {Outlet,Navigate} from 'react-router-dom'

function AdminRoute() {
    const {user:{role}}=isAuthenticated();
    return isAuthenticated() && role===1? <Outlet/>:<Navigate to='/'/> 
}

export default AdminRoute