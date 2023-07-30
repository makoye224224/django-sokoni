import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/actions/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useStateContext } from "../context/Context";

const api_uri = process.env.REACT_APP_API_URL;

const Login = ({ login, isAuthenticated }) => {
  const {

  } = useStateContext();
  const user = localStorage.getItem('user')
  const[loginFail, setLoginFail] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if(user){
    return <Redirect to="/" />;
  }
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
   const user =  await login(email, password);
    toast.success('Logged in Successfully');
    localStorage.setItem('user', JSON.stringify(user))
  
  } catch (err) {
    setLoginFail(true)
    toast.error(`${err.detail}`);
  }
};

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(`${api_uri }/auth/o/google-oauth2/?redirect_uri=${api_uri }/google`);
      window.location.replace(res.data.authorization_url);
    
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(`${api_uri }/auth/o/facebook/?redirect_uri=${api_uri }/facebook`);
      window.location.replace(res.data.authorization_url);
     
    } catch (err) {}
  };

  if (isAuthenticated) {

    return <Redirect to="/" />;
  }

  

  return (
    <div className="mt-5 text-center">
      <h1>Sign In</h1>
      <p>Sign into your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
        <br/>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
            <br/>
              { loginFail && (
        <div className="alert alert-danger">
          <p>Wrong password or Email</p>
        </div>
      )}
          </div>
          
        </div>
      
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            style={{
              borderRadius: '1rem',
            }}
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div className="text-center">
        <button
          className="btn btn-danger mt-3"
          style={{
            borderRadius: '1rem',
          }}
          onClick={continueWithGoogle}
        >
          Continue With Google
        </button>
        <br />
        <button
          className="btn btn-primary mt-3"
          style={{
            borderRadius: '1rem',
          }}
          onClick={continueWithFacebook}
        >
          Continue With Facebook
        </button>
        <p className="mt-3">
          Don't have an account? <Link to="/signup" >Sign Up</Link>
        </p>
        <p className="mt-3">
          Forgot your Password? <Link to="/reset-password" >Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
