import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PayPal = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process PayPal payment logic here
  };

  return (
    <div className="container">
      <h2>PayPal Payment Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Button variant="default" type="submit" style={{backgroundColor: '#2dace4', color: 'white', borderRadius: '2rem'}}>
          Pay with PayPal
        </Button>
      </Form>
    </div>
  );
};

export default PayPal;
