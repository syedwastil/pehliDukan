import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "../style/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

function Header() {
  const navigate=useNavigate()
  const guest = () => {
   
    if (isAuthenticated()) {
      const{user:{name}}=isAuthenticated();
      return (
        <>
          <span className="header__optionLineOne">Hello {name}</span>
          <span className="header__optionLineTwo" 
          onClick={() =>
                  signout(() => {
                    navigate("/");
                  })
                }
          >Sign out</span>
        </>
      );
    } else {return(      <>
      <span className="header__optionLineOne">Hello Guest</span>
       <Link className="header__optionLineTwo"  to="/signin">
       Sign In
       </Link>
     
   
    </>)

    }
  };

  return (
    <div className="header">
      <Link className="nav-link" to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          {guest()}
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
