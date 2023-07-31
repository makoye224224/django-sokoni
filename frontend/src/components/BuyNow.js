import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/Context";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const BuyNow = () => {
  const { productId } = useParams();
  const [price, setPrice] = useState(0)
  const [grandTotal, setGrandTotal] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const {
    cart,
    updateItemInCart,
    removeItemFromCart,
  } = useStateContext();

  const handleChange = (quantity, product) => (event) => {
    const selectedQuantity = parseInt(event.target.value, 10);
    setPrice(product.unit_price)
    if (quantity === selectedQuantity) {
      return;
    }
    try {
      updateItemInCart(product, selectedQuantity);
      setQuantity(selectedQuantity)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    setGrandTotal(quantity * price)
  },[quantity, price])

  return (
    <>
      <div className="productContainer col-md-6 container">
        {cart.length == 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <><ListGroup>
              {cart.some((item) => item?.product?.id == productId) ? (
                cart.map((item) => {
                  if (item?.product?.id == productId) {
                    return (
                      <ListGroup.Item key={item.id}>
                        <Row>
                          <Col xs={4} md={2}>
                            <Image
                              src="https://shorturl.at/lpFJW"
                              alt={item?.product?.title}
                              fluid
                              rounded />
                          </Col>
                          <Col xs={8} md={4}>
                            <span>
                              <p>{item?.product?.title}</p>
                            </span>
                            <p> $ {item?.quantity * item?.product?.unit_price}</p>
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
                                removeItemFromCart(item?.id);
                              } }
                            >
                              <AiFillDelete fontSize="20px" />
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  }
                  return null; // Skip rendering for other items in the cart
                })
              ) : (
                <ListGroup.Item>No product found in the cart.</ListGroup.Item>
              )}

            </ListGroup><br /><div className="text-center">
                <Button
                  type="button"
                  as={Link}
                  variant="default"
                  to={{
                    pathname: "/checkout",
                    state: {grandTotal}
                  }}
                  style={{
                    backgroundColor: "#2dace4",
                    borderRadius: "1rem",
                    color: "white",
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div></>
        )
        }
        
      </div>
    </>
  );
};

export default BuyNow;
