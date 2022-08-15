import React from 'react'
import {Link} from 'react-router-dom' 
import '../style/Home.css'

function Categories() {

const Card=(heading,image,link)=>{
    return (

            <div className="card">
                <div className="category    ">
                <p>{heading}</p> 
                </div>
                <div className="card-body">
                   
                    <img className='category__img' src={image} ></img>
                    <Link to='/user/dashboard'>
                        <button className="btn btn-warning btn-sm ">
                            Shop
                        </button>
                    </Link>
                </div>
            </div>

      )
}



  return (
    <div >
        <div className="row">
            <div className="col-3 ">
                {Card(
                    'Electronics',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg'
                )}

            </div>
            <div className="col-3 ">
                {Card(
                    'Trackers',
                    'https://m.media-amazon.com/images/I/712cLwnaHCL._AC_SX679_.jpg'
                )}

            </div>
            <div className="col-3 ">
                {Card(
                    'somewhat','https://m.media-amazon.com/images/I/71zVNebo81L._AC_SX679_.jpg'
                )}
            </div>
            <div className="col-3 ">
                {Card(
                    'Deals of day',
                    'https://m.media-amazon.com/images/I/61iO4cHjOQL._AC_SY230_.jpg'
                )}
            </div>
        </div>



    </div>
  )
}

export default Categories