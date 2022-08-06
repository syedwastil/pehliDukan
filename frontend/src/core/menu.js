import React from 'react'
import {Link, } from 'react-router-dom'
const isActive=(history,path)=>{
   // console.log(history,"....",path)
    // if(history.location.pathname===path){
        
    //     return {color:"#ff99ff"}
    // }else{
    //     return{ color :"#ffffff"}
    // }
}


function Menu({history}) {

  return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>

            </li>
            <li className="nav-item">

                <Link className="nav-link" to="/signin">Sign In</Link>

            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </ul>
    </div>
  )
}

export default Menu