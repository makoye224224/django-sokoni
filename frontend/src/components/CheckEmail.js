import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CheckEmail = () => {
  // Access the location object using the useLocation hook
  const location = useLocation();

  // Access the email parameter from the location state
  const email = location.state?.email;

  return (
    <Container className="py-5 text-center">
      <h4 className="mb-4">A Link Was Sent To {email}</h4>
      <p className="mt-3">Use the link to reset your password</p>
      <hr className="my-4" />
      <p style={{ fontStyle: 'italic' }}>
        <strong> Check your spam if you don't immediately see the email in your inbox </strong>
      </p>
      <p>Please submit another request if you don't see the link or it expires!</p>
      <a href="/" className="btn btn-primary mt-3" style={{borderRadius:'1rem'}}>Home</a>
    </Container>
  );
};

export default CheckEmail;
