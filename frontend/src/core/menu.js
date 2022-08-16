import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

function Menu({ history }) {
  let navigate = useNavigate();
  return (
    <div>
      {!isAuthenticated() && (
        <div>
          <ul className="nav nav-tabs bg-light">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}

      {isAuthenticated() && (
        <div>
          <ul className="nav nav-tabs bg-light">
          <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
            {isAuthenticated() && isAuthenticated().user.role===1 &&(
              <Link className="nav-link" to="/admin/dashboard">
                Dashboard
              </Link>
            )}
            {isAuthenticated() && isAuthenticated().user.role===0 &&(
              <Link className="nav-link" to="/user/dashboard">
                Dashboard
              </Link>
            )}
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "fffff" }}
                onClick={() =>
                  signout(() => {
                    navigate("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
