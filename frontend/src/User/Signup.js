import React,{useState} from 'react'
import axios from 'axios'
import Layout from '../core/Layout'
import {API} from '../config'

function Signup() {
  const [values, setvalues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
  });

//Extract values to be passed
const{name,email,password}=values;

//update values in syaye as soon the data is changed in input
  const handleChange=name=>e=> {
    setvalues({...values,error:false,[name]:e.target.value});
  }
//Ckick Submit will be called for sendindg data to backend
  const clickSubmit=e=>{
    e.preventDefault();
    signup({name:name,email:email,password:password})
  }

  //API method for signup
  const signup=(user)=>{

axios.post('${API}/signup',{
  headers:{
    Accept:'application/json',
    "Content-Type":"application/json"
  },
  body:JSON.stringify(user)
})
  }

  //react functional componenet
  const signUpForm=()=>(
    <form >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
  )
  return (
    <>
    <Layout 
    title="Sign Up"
    description="Be our member" className="Container col-md-6 offset-md-3 "> 
    {signUpForm()}
    {JSON.stringify(values)}
     </Layout>
 

</>
  )
}

export default Signup