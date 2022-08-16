import React from 'react'
import {API} from "../config"
import "../style/Home.css"

function ShowPhoto({item,url}) {
  return (
    <div className="product-img">
        <img 
        src={`${API}/${url}/photo/${item._id}`} 
        alt={item.name}
        className="category__img "
      />
    </div>
  )
}

export default ShowPhoto