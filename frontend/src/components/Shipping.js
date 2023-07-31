import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useStateContext } from "../context/Context";
import { FaPlus, FaTimes } from "react-icons/fa";
import CardPayment from "./CardPayment";
import PayPal from "./PayPal";
import MobilePayment from "./MobilePayment";

const Shipping = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [allAddresses, setAllAddresses] = useState(false);
  const addresses = ["Address1", "Address2", "Address3"];
  const dates = ["August 12 2023", "August 16 2023", "August 20 2023"];
  const [addressForm, setAddressForm] = useState(false);
  const [instructionForm, setInstructionForm] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    cart,
    MyCart,
    OneProduct,
    addToCart,
    fetchCart,
    updateItemInCart,
    removeItemFromCart,
  } = useStateContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process shipping information logic here

    setAddressForm(false);
  };

  const handleInstructionSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here

    setInstructionForm(!instructionForm);
    setDeliveryInstructions("");
  };

  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h2 className="container text-center">Shipping Information</h2>
      <br />
      <section>
        <div className="row container text-center">
          <div className="col-4">
            <p>Shipping Addess</p>
          </div>
          <div className="col-6">
            <strong>Emmanuel Makoye</strong>
            <p> 2335 Murray Hill Road Cleveland, OH 44106-2652 </p>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setInstructionForm(!instructionForm);
              }}
            >
              {" "}
              Add delivery instructions
            </a>
            {instructionForm ? (
              <div>
                <Form onSubmit={handleInstructionSubmit}>
                  <Form.Group controlId="deliveryInstructions">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="delivery_Instructions"
                      placeholder="Delivery Instructions"
                      value={deliveryInstructions}
                      onChange={(event) =>
                        setDeliveryInstructions(event.target.value)
                      }
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            ) : null}
          </div>
          <div className="col-2">
            <a
              href=""
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setAddressForm(false);
                setAllAddresses(!allAddresses);
              }}
            >
              {allAddresses ? "Close" : "Change"}
            </a>
          </div>
        </div>
        <div className="container">
          {allAddresses ? (
            <div>
              {addresses.map((address, index) => (
                <div key={index}>
                  <span>
                    <input type="radio" name="addressGroup" />
                  </span>
                  <span>{address}</span>
                </div>
              ))}
              <div>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setAddressForm(!addressForm);
                  }}
                >
                  {!addressForm ? (
                    <>
                      <FaPlus className="mr-2" />
                      Add a new Address
                    </>
                  ) : (
                    <>
                      <FaTimes className="mr-2" />
                      Close
                    </>
                  )}
                </a>
              </div>
            </div>
          ) : null}
        </div>
        <div className="container">
          {addressForm ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State:</Form.Label>
                <Form.Control
                  type="text"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                />
              </Form.Group>
              <Button
                variant="default"
                type="submit"
                style={{
                  backgroundColor: "#2dace4",
                  color: "white",
                  borderRadius: "2rem",
                }}
              >
                Save
              </Button>
            </Form>
          ) : null}
          <hr />
        </div>
      </section>
    </>
  );
};

export default Shipping;
