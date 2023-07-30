import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useStateContext } from "../context/Context";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    MyCart,
    OneProduct,
    addToCart,
    fetchCart,
    updateItemInCart,
    removeItemFromCart,
  } = useStateContext();
  const [total, setTotal] = useState(0);

  const handleChange = (quantity, productId) => (event) => {
    const selectedQuantity = parseInt(event.target.value, 10);

    if (quantity === selectedQuantity) {
      return;
    }
    try {
      updateItemInCart(MyCart.id, productId, selectedQuantity);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {cart.length === 0 ? (
        <>
          <hr />

          
            <div className="card-body">
              <h6 className="container d-flex justify-content-center">
                Please add items to cart before proceeding
              </h6>
              <br/>
              <div className="text-center"> 
              <a href="/"><h4>Go To Products</h4></a>
              </div>
            </div>
       
        </>
      ) : (
        <div className="home row">
          <div className="productContainer col-md-6 container">
            <ListGroup>
              {cart.map((item) => {
                return (
                  <ListGroup.Item key={item.id}>
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
                        <p> $ {item?.total_price}</p>
                        <Rating rating={4} />
                      </Col>
                      <Col xs={8} md={4}>
                        <Form.Control
                          as="select"
                          value={item?.quantity}
                          onChange={handleChange(item?.quantity, item?.id)}
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
                            removeItemFromCart(MyCart.id, item?.id);
                          }}
                        >
                          <AiFillDelete fontSize="20px" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
          <div className="filters summary col-md-6 container">
            <h3 className="title container">Subtotal ({cart.length}) items</h3>
            <hr />
            <div
              style={{ fontWeight: 700, fontSize: 20 }}
              className="container"
            >
              Total: $ {MyCart.total_price}
            </div>
            <br />
            <div className="container">
              <Button
                type="button"
                disabled={cart.length === 0}
                as={Link}
                variant="default"
                to={{
                  pathname: "/checkout",
                  state: {
                    total: total,
                    from: "/checkout",
                  },
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
