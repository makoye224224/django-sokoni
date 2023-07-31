import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SingleProductList from "./SingleProductList";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "./Rating";
import { useStateContext } from "../context/Context";

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    cart,
    addToCart,
    removeItemFromCart,
    OneProduct,
  } = useStateContext();
  const [product, setProduct] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const prod = await OneProduct(productId);
        setProduct(prod);
        console.log(prod)
      } catch (error) {
        console.error(error);
        console.log(error);
      }
    };

    getProduct();
  }, [productId]);

  // Function to filter similar products
  const getSimilarProducts = () => {};

  // Function to filter different products
  const getDifferentProducts = () => {};

  const similarProducts = getSimilarProducts();
  const differentProducts = getDifferentProducts();

  const handleAddTocart = () => {
    const payload = {
      product: product,
      quantity: 1,
    };
     try {
      addToCart(payload);
    } catch (error) {
      console.error(error);
     
    }
  };

  const handleBuyNowClick = () => {
    const isProductInCart = cart.some((item) => item?.product?.id == product.id);
    console.log(isProductInCart)
    if (!isProductInCart) {
      handleAddTocart();
    }
  
    history.push(`/buynow/${product.id}`);
  };
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
  
          <Row>
            <Col md={7}>
              <div className="Card">
                <img
                  src="https://shorturl.at/lpFJW"
                  alt="product"
                  className="img-fluid"
                  style={{ borderRadius: "1rem", objectFit: "contain" }}
                />
              </div>
            </Col>
            <Col md={5}>
              <br />
              <section>
                <div className="d-flex">
                  <h4 className="mr-5">{product && product.title}</h4>
                 
                </div>

                <hr />
                <div>
                  <p>{product && product.description}</p>
                </div>
                <div>$ {product && product.unit_price}</div>
                <br />
                <div>
                  <Rating rating={4} />
                </div>
                <br />
                <p>Color</p>
                <input type="radio" className="mr-4" />
                <input type="radio" className="mr-4" />
                <input type="radio" className="mr-4" />
              </section>
              <br />
              <section>
                {!product?.inventory ? (
                  <div className="text-danger d-flex justify-content-center">
                    Out of Stock
                  </div>
                ) : (
                  <div
                    className="d-flex justify-content-center"
                    style={{ cursor: "pointer" }}
                  >
                    {cart.some((item) => item?.product?.id === product?.id) ? (
                      <Button
                        variant="default"
                        onClick={() => {
                          const item = cart.find(
                            (item) => item?.product?.id === product?.id
                          );
                         
                          removeItemFromCart(product?.id);
                        }}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "1rem",
                        }}
                      >
                        Remove From Cart
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleAddTocart}
                        style={{
                          backgroundColor: "#2dace4",
                          borderRadius: "1rem",
                          color: "white",
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="success"
                      onClick={handleBuyNowClick}
                      style={{ marginLeft: "20px", borderRadius: "1rem" }}
                    >
                      Buy Now
                    </Button>
                  </div>
                )}
              </section>
            </Col>
          </Row>

      </Container>
    </>
  );
};

export default ProductDetails;
