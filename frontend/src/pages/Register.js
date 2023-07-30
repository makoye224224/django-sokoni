import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../store/actions/auth';
import axios from 'axios';

const api_uri = process.env.REACT_APP_API_URL;

const Register = ({ signup, isAuthenticated, signupError }) => {
  const[passwordMatch, setPasswordMatch] = useState(true)
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    re_password: ''
  });

  const { first_name, last_name, email, password, re_password, username } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (password === re_password) {
      setPasswordMatch(true)
      try{
      const user = signup(first_name, last_name, email, password, re_password, username);
      setAccountCreated(true); 
      }
      catch(error){
        console.log(error)
      }
    }
    else{
      setPasswordMatch(false)
    }
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(`${api_uri }/auth/o/google-oauth2/?redirect_uri=${api_uri }/google`)

      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log(err)
    }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(`${api_uri }/auth/o/facebook/?redirect_uri=${api_uri }/facebook`)

      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log(err)
    }
  };

  if (accountCreated) {
    return <Redirect to={{ pathname: '/account_created', state: { email: email } }} />;
  }

  return (
    <div className='container mt-5 text-center'>
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='First Name*'
                name='first_name'
                value={first_name}
                onChange={onChange}
               required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Last Name*'
                name='last_name'
                value={last_name}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChange}
                required
              />
            </div>
            {signupError && signupError.detail && (
        <div className="alert alert-danger">
          <p>This username is taken</p>
        </div>
      )}
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email*'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            {signupError && signupError.email && (
        <div className="alert alert-danger">
          {signupError.email.map((errorMessage, index) => (
            <p key={index}>{errorMessage}</p>
          ))}
        </div>
      )}
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                placeholder='Password*'
                name='password'
                value={password}
                onChange={onChange}
                minLength='6'
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                placeholder='Confirm Password*'
                name='re_password'
                value={re_password}
                onChange={onChange}
                minLength='6'
                required
              />
            </div>
            <div>
            {!passwordMatch && (
        <div className="alert alert-danger">
          <p>Passwords do not match</p>
        </div>
      )}
            </div>
           
     
            <div className="text-center">
              <button className='btn btn-primary' style={{ borderRadius: '1rem' }} type='submit'>Register</button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center">
        <button className='btn btn-danger mt-3' style={{ borderRadius: '1rem' }} onClick={continueWithGoogle}>
          Continue With Google
        </button>
        <br />
        <button className='btn btn-primary mt-3' style={{ borderRadius: '1rem' }} onClick={continueWithFacebook}>
          Continue With Facebook
        </button>
        <p className='mt-3'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  signupError: state.auth.signupError 
});

export default connect(mapStateToProps, { signup })(Register);
