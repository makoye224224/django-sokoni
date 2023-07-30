import React from 'react';
import { Card } from 'react-bootstrap';

const AccountDetails = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Account Details</Card.Title>
          <Card.Text>
            <p>Name: </p>
            <p>Email: </p>
            {/*<p>Phone: {user && user.phone}</p>*/}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AccountDetails;
