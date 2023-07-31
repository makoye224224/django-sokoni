import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import CardPayment from "./CardPayment";
import MobilePayment from "./MobilePayment";
import PayPal from "./PayPal";
import Shipping from "./Shipping";
import { useStateContext } from "../context/Context";
const Checkout = (props) => {
  const dates = ["August 12 2023", "August 16 2023", "August 20 2023"];
  const [addressForm, setAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    cart,
    constructCartItem,
    setCart,
    PlaceOrder,
  } = useStateContext();

  const grandTotal = props.location.state?.grandTotal || 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process shipping information logic here

    setAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    try {
      // First, construct the cart items using constructCartItem
      await constructCartItem();

      // Then proceed to place the order
     // await PlaceOrder();

      // Now, you can clear the cart or take other actions as needed
      setCart([]); // Clear the cart
      localStorage.removeItem('cartId')
      // ... (Other actions if needed)
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Shipping/>
    <div className="text-center">
        <h3>Review Items and Shipping</h3>
        <p>Delivery: July 28 2023 if you order in the next 2hrs</p>
      </div>
      <br />

      <div className="row container-fluid text-center">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-5 container mb-2">
              {cart.map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-6">
                      <img
                        src="https://shorturl.at/lpFJW"
                        alt="product image"
                        className="img-fluid mb-1"
                        style={{ objectFit: "contain", borderRadius: "0.5rem" }}
                      />
                    </div>
                    <div className="col-6">{item?.product?.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="col-md-5 container mb-2">
              <p>Choose your delivery Option:</p>
              {dates.map((date, index) => (
                <div key={index}>
                  <span>
                    <input type="radio" name="addressGroup" />
                  </span>
                  <span>{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 container mb-2">
          <p>
            Your Total is $ <strong>{grandTotal}</strong>
          </p>

          <hr />

          <h4 className="container">Please Enter Your Payment Method</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="paymentMethod">
              <Form.Label className="container">
                Select Payment Method:
              </Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Mpesa">Mpesa</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="Tigo Pesa">Tigo Pesa</option>
                <option value="Halo Pesa">Halo Pesa</option>
                <option value="PayPal">PayPal</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {paymentMethod === "Credit Card" || paymentMethod === "Debit Card" ? (
            <CardPayment />
          ) : paymentMethod === "PayPal" ? (
            <PayPal />
          ) : paymentMethod === "" ? null : (
            <MobilePayment />
          )}
        </div>
       
      </div>

    </>
  );
};

export default Checkout;
