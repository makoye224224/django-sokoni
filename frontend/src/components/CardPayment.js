import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CardPayment = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform card payment processing or other actions here
  };

  return (
    <div className='container'>
      <h4>Enter Card Payment Details</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number:</Form.Label>
          <Form.Control type="text" placeholder="Enter card number" required />
        </Form.Group>

        <Form.Group controlId="cardHolderName">
          <Form.Label>Card Holder Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter card holder name" required />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Form.Col} controlId="expiryDate">
            <Form.Label>Expiry Date:</Form.Label>
            <Form.Control type="text" placeholder="MM/YY" required />
          </Form.Group>

          <Form.Group as={Form.Col} controlId="cvv">
            <Form.Label>CVV:</Form.Label>
            <Form.Control type="text" placeholder="Enter CVV" required />
          </Form.Group>
        </Form.Row>

        {/* Add more form inputs for additional card payment details as needed */}

        <Button variant="default" type="submit" style={{backgroundColor: '#2dace4', color: 'white', borderRadius: '2rem'}}>Pay With Card</Button>
      </Form>
    </div>
  );
};

export default CardPayment;
