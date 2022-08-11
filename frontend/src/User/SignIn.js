import React, { useState } from "react";
import {Navigate} from "react-router-dom"
import Layout from "../core/Layout";
import { signupin,authenticate, isAuthenticated } from "../auth/index";

function Signin() {
  const [values, setvalues] = useState({
    email: "t@t.pk",
    password: "test@123",
    error: "",
   loading: false,
   redirectToReferrer:false,
  });

  //Extract values to be passed
  const { name, email, password,error,loading,redirectToReferrer } = values;
  const {user}=isAuthenticated();
  //update values in syaye as soon the data is changed in input
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };
  //Ckick Submit will be called for sendindg data to backend
  const clickSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, loading: true });
    signupin({ email: email, password: password },'signin')
    .then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error, loading: false });
      } else {
       authenticate(data,()=>{
        setvalues({
          ...values,
          redirectToReferrer:true,
        });
       })
      }
    });
  };



  //react functional componenet
  const signInForm = () => (
    <form>

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
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
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
      <h2>Loading...</h2>
    </div>
  );

  const redirectUser=()=>{
    if(redirectToReferrer){
      if(user && user.role===1){
        return(<Navigate to="/admin/dashboard" />)
      }else{
        return (<Navigate  to="/"/>)
      }
      
    }

  }

  return (
    <>
      <Layout
        title="Sign In"
        description="Welcome to Pehli Dukan"
        className="Container col-md-6 offset-md-3 "
      >
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
      </Layout>
    </>
  );
}

export default Signin;
