import React from 'react';
import { Form, Button } from 'react-bootstrap';

const MobilePayment = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform mobile payment processing or other actions here
  };

  return (
    <div className='container'>
      <h4>Enter Mobile Payment Details</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" required />
        </Form.Group>

        <Form.Group controlId="network">
          <Form.Label>Mobile Network:</Form.Label>
          <Form.Control as="select" required>
            <option value="">-- Select Mobile Network --</option>
            <option value="Vodacom">Vodacom</option>
            <option value="Tigo">Tigo</option>
            <option value="Airtel">Airtel</option>
            <option value="Halotel">Halotel</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="transactionID">
          <Form.Label>Transaction ID:</Form.Label>
          <Form.Control type="text" placeholder="Enter transaction ID" required />
        </Form.Group>

        {/* Add more form inputs for additional mobile payment details as needed */}

        <Button variant="default" type="submit" style={{backgroundColor: '#2dace4', color: 'white', borderRadius: '2rem'}}>Pay With Mobile Money</Button>
      </Form>
    </div>
  );
};

export default MobilePayment;
