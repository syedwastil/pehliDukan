import React, { useState } from "react";
import Layout from "../core/Layout";
import { signupin } from "../auth/index";

function Signin() {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //Extract values to be passed
  const { name, email, password,error,success } = values;

  //update values in syaye as soon the data is changed in input
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };
  //Ckick Submit will be called for sendindg data to backend
  const clickSubmit = (e) => {
    e.preventDefault();
    signupin({ email: email, password: password },'signin').then((data) => {
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
    <>
      <Layout
        title="Sign In"
        description="Welcome to Pehli Dukan"
        className="Container col-md-6 offset-md-3 "
      >
        {showSuccess()}
        {showError()}
        {signInForm()}
      </Layout>
    </>
  );
}

export default Signin;
