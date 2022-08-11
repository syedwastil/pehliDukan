import {BrowserRouter,Route,Routes}from "react-router-dom"
import React from 'react'
import Home from "./core/Home"
import Signup from "./User/Signup"
import Signin from "./User/Signin"
import PrivateRoute from "./auth/PrivateRoute"
import UserDashboard from "./User/UserDashboard"
import AdminRoute from "./auth/AdminRoute"
import AdminDashboard from "./User/AdminDashboard"
import AddCategory from "./admin/AddCategory"

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup"  element={<Signup/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/user/dashboard" element={<UserDashboard/>}/>
            </Route>
            <Route element={<AdminRoute/>}>
              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/create/category" element={<AddCategory/>}/>
            </Route>
        </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes