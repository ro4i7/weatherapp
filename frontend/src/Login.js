import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './LoginValidation';
import axios from 'axios'


function Login() {
    const [values, setValues]= useState({
        email:'',
        password:''
    })
    const navigate= useNavigate(); 
const [errors,setErrors]=useState({})
const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors(validation(values));
  }  
const handleSubmit=(event)=>{
    event.preventDefault();
    const err= validation(values);
    setErrors(err);
    if(err.email==="" && err.password===""){
        axios.post('http://localhost:8081/login', values)
    .then(res => {
        console.log('Server response:', res.data); 
        if (res.data === "Success") {
            navigate('/home');
            alert("Success!")
        } else {
            alert("No records existed");
        }
    })
    .catch(err => console.log(err));
    
    }

}

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlfor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter email' name='email' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span> }
                </div>
                <div className='mb-3'>
                    <label htmlfor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span> }
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                <p> you are getting sign in now</p>
                <Link to="/signup" className="btn btn-light border w-100 rounded-0 text-decoration-none">Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login