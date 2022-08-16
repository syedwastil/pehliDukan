import React from 'react'
import {Link} from 'react-router-dom' 
import '../style/Home.css'

function Categories() {

const Card=(heading,image,link)=>{
    return (

            <div className="card">
                <div className="category">
                <strong>{heading}</strong> 
                </div>
                <div className="card-body pb-2">            
                    <img className='category__img' src={image} ></img>
                    <Link to='/user/dashboard'>
                        <button className="btn btn-warning btn-sm mt-2 ">
                            Shop
                        </button>
                    </Link>
                </div>
            </div>

      )
}



  return (
    <div >
        <div className="row ct">
            <div className="col-3 category__col">
                {Card(
                    'Health & Personal Care',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/February/DashboardCards/GW_CONS_AUS_HPC_HPCEssentials_CatCard_Desktop1x._SY304_CB627424361_.jpg'
                )}

            </div>
            <div className="col-3 category__col">
                {Card(
                    'Computers & Accessories',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg'
                )}

            </div>
            <div className="col-3 category__col">
                {Card(
                    'Electronics',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg'
                )}
            </div>
            <div className="col-3 category__col">
                {Card(
                    'Get Fit at Home',
                    'https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg'
                )}
            </div>
        </div>
        <div className="row ct">
            <div className="col-3 category__col">
                {Card(
                    'Create with strip lights',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_StripLighting_379x304_1X_en_US._SY304_CB418597476_.jpg'
                )}

            </div>
            <div className="col-3 category__col">
                {Card(
                    'Home & kitchen essentials',
                    'https://m.media-amazon.com/images/I/41wjYZ4VYJL._SY160_.jpg'
                )}

            </div>
            <div className="col-3 category__col">
                {Card(
                    'Shop Pet supplies',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_Pets_1X._SY304_CB639746743_.jpg'
                )}
            </div>
            <div className="col-3 category__col">
                {Card(
                    'Shop Laptops & Tablets',
                    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg'
                )}
            </div>
        </div>



    </div>
  )
}

export default Categories