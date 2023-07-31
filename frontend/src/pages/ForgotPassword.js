import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../store/actions/auth';

const ForgotPassword = ({ reset_password }) => {
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    console.log(reset_password(email));
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to={{ pathname: '/checkemail', state: { email: email } }} />;
  }

  return (
    <div className='container mt-5 text-center'>
      <h1>Request Password Reset:</h1>
      <form onSubmit={onSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="text-center">
              <button className='btn btn-primary' style={{ borderRadius: '1rem' }} type='submit'>Reset Password</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ForgotPassword);
