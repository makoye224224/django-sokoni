import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AccountCreated = () => {
  // Access the location object using the useLocation hook
  const location = useLocation();

  // Access the email parameter from the location state
  const email = location.state?.email;

  return (
    <Container className="py-5 text-center container">
        <h4 className="mb-4">Thank You for creating an Account with Sokoni</h4>
      <h6 className="mb-4">A link has been sent to <strong>{email}</strong></h6>
      <p className="mt-3">Use the link to verify your registration before you can login</p>
      <hr className="my-4" />
      <p style={{ fontStyle: 'italic' }}>
        <strong> Check your spam if you don't immediately see the email in your inbox </strong>
      </p>
      <a href="/" className="btn btn-primary mt-3" style={{borderRadius:'1rem'}}>Home</a>
    </Container>
  );
};

export default AccountCreated;
