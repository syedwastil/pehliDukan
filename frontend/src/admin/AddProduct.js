import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {createProduct,getCategories} from './apiAdmin.js'
import { set } from 'mongoose'

function AddProduct() {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectoProfle:'',
        formData:''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectoProfle,
        formData,
    } =values

    const init=()=>{
        getCategories()
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values,categories:data,createdProduct:'',formData:new FormData()})
                }
            })
    }

    useEffect(() => {
        init();
    }, []);

    //destructure user token
    const{user,token}=isAuthenticated();

    const handleChange=name=>(e)=>{
        const value=name==='photo'?e.target.files[0] : e.target.value
        formData.set(name,value);
        setValues({...values,[name]:value,error:'',createdProduct:''})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setValues({...values,error:"",loading:true})
        createProduct(user._id,token,formData)
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({
                        ...values,
                        name:'',
                        description:'',
                        price:'',
                        quantity:'',
                        photo:'',
                        loading:false,
                        createdProduct:data.name,
        
                    })
                }
            })

    }

    const newProductForm=()=>{
        return(
            <form className='mb-3' onSubmit={handleSubmit}>
                <h4>Product Photo</h4>
                <div className="form-group">
                    <label  className="btn btn-secondary">
                    <input type="file" name='photo' accept='image/*'  onChange={handleChange('photo')} />
                    </label>
                </div>
                <div className="form-group">
                    <label  className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
                    
                </div>
                <div className="form-group">
                    <label  className="text-muted">Description</label>
                    <textarea type="text" className="form-control" onChange={handleChange('description')} value={description} />
                    
                </div>
                <div className="form-group">
                    <label  className="text-muted">Price</label>
                    <input type="number" className="form-control" onChange={handleChange('price')} value={price} />
                    
                </div>
                <div className="form-group">
                    <label  className="text-muted">Category</label>
                    <select  className="form-control" onChange={handleChange('category')}>
                        <option selected>Please Select</option>
                        {categories && categories.map((c,i)=>(
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}
                        
                    </select>  
                    
                </div>
                <div className="form-group">
                    <label  className="text-muted">Quantity</label>
                    <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} />
                    
                </div>
                <div className="form-group">
                    <label  className="text-muted">Shipping</label>
                    <select  className="form-control" onChange={handleChange('shipping')}>
                    <option selected>Please Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        
                    </select>  
                    
                </div>
                <button className="btn btn-outline-primary">Create Product</button>
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
          style={{ display: createdProduct ? "" : "none" }}
        >
          {createdProduct} is created successfully.
        </div>
      );
      const showLoading = () => (
        <div
          className="alert alert-info"
          style={{ display: loading ? "" : "none" }}
        >
        <h3>Loading...</h3>
        </div>
      );


        const goBack=()=>(
            <div className="md-5">
                <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
            </div>
        )

    return (
        <Layout title='Create Product' description={`Hello! ${user.name} Create a new product`} className='container'>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newProductForm()}
                {goBack()}
            </div>
        </div>
            
        </Layout>
      )
}

export default AddProduct