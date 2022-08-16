import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signupin } from "../auth/index";
import "../style/Signin.css";

function Signup() {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //Extract values to be passed
  const { name, email, password, error, success } = values;

  //update values in syaye as soon the data is changed in input
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };
  //Ckick Submit will be called for sendindg data to backend
  const clickSubmit = (e) => {
    e.preventDefault();
    signupin({ name: name, email: email, password: password }, "signup").then(
      (data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error, success: false });
        } else {
          setvalues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };

  //react functional componenet
  const signUpForm = () => (
    <>
    <form>
    <div className="form-group">
    <label className="text-muted">Your name</label>
      <input
        onChange={handleChange("name")}
        type="text"
        className="form-control"
        value={name}
      />
    </div>
    <div className="form-group">
    <label className="text-muted">Email</label>
      <input
        onChange={handleChange("email")}
        type="email"
        className="form-control"
        value={email}
      />
    </div>
    <div className="form-group">
    <label className="text-muted">Password</label>
      <input
        onChange={handleChange("password")}
        type="password"
        className="form-control"
        value={password}
      />
    </div>






      <button onClick={clickSubmit} className="login__signInButton">
        Submit
      </button>
    </form>
    <p>
    By creating an account, you agree to Amazon's <a href="">Conditions of Use</a>   and <a href="">Privacy Notice.</a> 
    </p>
 
    <p>Already have an Account?
    <Link to="/signin">Sign In</Link>
    </p>
    </>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error[0]}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created successfully. Please signin.
    </div>
  );

  return (
    <div className="body">
      <div className="row no-gutter">
        <div className="col-4"></div>
          <div className="col-4 login">
          <Link to="/">
            <img
              className="login__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            />
          </Link>
          <div className=" login__container">
            <h3>Create Account</h3>
            {showSuccess()}
            {showError()}
            {signUpForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
