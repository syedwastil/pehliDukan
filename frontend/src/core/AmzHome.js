import React from 'react'
import Footer from './Footer'
import Header from './Header'
import "../style/Home.css"

function AmzHome() {

    
  return (
    <div>
       <Header/>
        <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src=	"https://m.media-amazon.com/images/I/61sS0RtWD0L._SX1500_.jpg"
          alt=""
        />
      </div>
    </div>

 
    </div>
  )
}

export default AmzHome