import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { signupin, authenticate, isAuthenticated } from "../auth/index";
import "../style/Signin.css";


function Signin() {
  const [values, setvalues] = useState({
    email: "t@t.pk",
    password: "test@123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  //Extract values to be passed
  const { name, email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  //update values in syaye as soon the data is changed in input
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };
  //Ckick Submit will be called for sendindg data to backend
  const clickSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, loading: true });
    signupin({ email: email, password: password }, "signin").then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setvalues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  //react functional componenet
  const signInForm = () => (
    <>
      <form>
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
    
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
      By continuing, you agree to Amazon's Clone <a href="">Conditions of Use</a>  and <a href="">Privacy Notice</a> .
      </p>
      <Link to="/signup" >
      <button className="login__registerButton">Create your Clone Account</button>
        
      </Link>
    </>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  };

  return (
    <div className="body">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 login">
          <Link to="/">
            <img
              className="login__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            />
          </Link>

          <div className=" login__container">
            <h3>Sign In</h3>
            {showLoading()}
            {showError()}
            {redirectUser()}
            {signInForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
