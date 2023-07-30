import React from 'react';
import { Card } from 'react-bootstrap';

const Orders = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Orders</Card.Title>
          <Card.Text>
            <p>Order 1</p>
            <p>Order 2</p>
            <p>Order 3</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Orders;
