import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    // Update the state when the input changes
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        console.log('Server response:', res.data);
        if (res.data.message === "Success") {
          alert("Login Failed!");
        } else {
            navigate('/home');
          alert("Success");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter email' name='email' onChange={handleInput} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          <p>you are getting sign in now</p>
          <Link to="/signup" className="btn btn-light border w-100 rounded-0 text-decoration-none">Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
