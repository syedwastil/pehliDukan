import React,{useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {createCategory} from './apiAdmin.js'

function AddCategory() {
    const [name, setname] = useState('')
    const [error, seterror] = useState('')
    const [success, setsuccess] = useState(false)

    //destructure user token
    const{user,token}=isAuthenticated();

    const handleChange=(e)=>{
        seterror('')
        setname(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        seterror('');
        setsuccess(false);
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                //seterror(data.error);
                error=='Duplicate Error'?seterror('Category already exists.'):seterror(data.error);
            }else{
                seterror('')
                setsuccess(true)
            }
        })
    }

    const newCategoryForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label  className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} />
                    
                </div>
                <button className="btn btn-outline-primary">Create Category</button>
            </form>
        )
    }

    const showError = () => (
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      );
    
      const showSuccess = () => (
        <div
          className="alert alert-info"
          style={{ display: success ? "" : "none" }}
        >
          {name} is created successfully.
        </div>
      );

const goBack=()=>(
    <div className="md-5">
        <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
    </div>
)

  return (
    <Layout title='Create Category' description={`Hello! ${user.name} Create a new category`} className='container'>
    <div className="row">
        <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {newCategoryForm()}
        {goBack()}
        </div>
    </div>
        
    </Layout>
  )
}

export default AddCategory