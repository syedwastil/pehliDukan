import {BrowserRouter,Route,Routes}from "react-router-dom"
import React from 'react'
import Home from "./core/Home"
import Signup from "./User/Signup"
import Signin from "./User/Signin"

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup"  element={<Signup/>}/>
        </Routes>
    </BrowserRouter>

  )
}

export default AppRoutes