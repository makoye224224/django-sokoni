import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useStateContext } from "../context/Context";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    updateItemInCart,

    removeItemFromCart,

    cart,
  } = useStateContext();

  const handleChange = (quantity, product) => (event) => {
    const selectedQuantity = parseInt(event.target.value, 10);

    if (quantity === selectedQuantity) {
      return;
    }
    try {
      updateItemInCart(product, selectedQuantity);
    } catch (err) {
      console.error(err);
    }
  };

  const grandTotal = cart.reduce((total, item) => {
    return total + item?.product?.unit_price * item?.quantity;
  }, 0);

  return (
    <>
      {cart?.length === 0 ? (
        <>
          <hr />

          <div className="card-body">
            <h6 className="container d-flex justify-content-center">
              Please add items to cart before proceeding
            </h6>
            <br />
            <div className="text-center">
              <a href="/">
                <h4>Go To Products</h4>
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="home row">
          <div className="productContainer col-md-6 container">
            {cart?.map((item) => {
              return (
                <ListGroup>
                  <ListGroup.Item key={item?.product?.id}>
                    <Row>
                      <Col xs={4} md={2}>
                        <Image
                          src="https://shorturl.at/lpFJW"
                          alt={item?.product?.title}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col xs={8} md={4}>
                        <span>
                          <p>{item?.product?.title}</p>
                        </span>
                        <p> $ {item?.product?.unit_price * item?.quantity}</p>
                        <Rating rating={4} />
                      </Col>
                      <Col xs={8} md={4}>
                        <Form.Control
                          as="select"
                          value={item?.quantity}
                          onChange={handleChange(item?.quantity, item?.product)}
                          style={{ width: "100px" }}
                        >
                          {[...Array(item?.product?.inventory).keys()].map(
                            (x) => (
                              <option key={x + 1}>{x + 1}</option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                      <Col xs={4} md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            removeItemFromCart(item?.product?.id);
                          }}
                        >
                          <AiFillDelete fontSize="20px" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </div>
          <div className="filters summary col-md-6 container">
            <h3 className="title container">Subtotal ({cart?.length}) items</h3>
            <hr />
            <div
              style={{ fontWeight: 700, fontSize: 20 }}
              className="container"
            >
              Total: $ {grandTotal}
            </div>
            <br />
            <div className="container">
              <Button
                type="button"
                as={Link}
                variant="default"
                to={{
                  pathname: "/checkout",
                  state: { grandTotal },
                }}
                style={{
                  backgroundColor: "#2dace4",
                  borderRadius: "1rem",
                  color: "white",
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
            <br />
            <div className="container">
              <p>We accept the following payment methods:</p>
              <li>Credit Card</li>
              <li>Debit Card</li>
              <li>Mpesa</li>
              <li>Airtel Money</li>
              <li>Tigo Pesa</li>
              <li>Halo Pesa</li>
              <li>Paypal</li>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
