import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStateContext} from "../context/Context";
import Rating from "./Rating";


const SingleProduct = ({ prod }) => {
  const history = useHistory();
  const {
    state: { cart },
    dispatch,
  } = useStateContext();
  const [expanded, setExpanded] = useState(false);

  const handleBuyNowClick = () => {
   
    history.push(`/buynow/${prod.id}`);
  };

  return (
    <Card 
    style={{
      borderRadius: '2rem', 
      backgroundColor: '#FFF5EE', 
      boxShadow: '5px 5px 2px rgba(10, 10, 10, 0.5)',
      height: '34rem',
      maxWidth: '25rem',
       overflow: 'hidden'}}>
      <br/>
      <a
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    history.push(`/product-details/${prod.id}`);
  }}
  style={{ cursor: "pointer" }}
>
    <Card.Title className="container-fluid" style={{ width: '370px', height: '260px' }} >
      <img 
      src= {prod && prod.image} 
      className="img-fluid" 
      alt="product photo"
      loading="lazy"
      style={{ borderRadius: '1rem', objectFit: 'contain'}} 
      />
    </Card.Title>
    <Card.Subtitle className="mb-2 container">
  <div className="d-flex flex-wrap" style={{fontWeight: 'bold'}}>
    <div className="flex-grow-1">
      <p className="d-inline container">{prod && prod.name}</p>
    </div>
    <div>
      <p className="d-inline container">$ {prod && prod.price.split('.')[0]}</p>
    </div>
  </div>
</Card.Subtitle>
<div className="container">
{prod.fastDelivery ? (
            <p className="container">Fast Delivery</p>
          ) : (
            <p className="container">4-day Delivery</p>
          )}
          </div>

<Card.Text className="container">
  <p className="container" style={{width: '100%', height: '1.6rem', overflow: 'hidden'}}> {prod && prod.description}</p>
         
        </Card.Text>

        <div className="d-flex justify-content-center" style={{scale: '120%'}}>
          <Rating rating={prod.ratings}/>
        </div>

        </a>
      <Card.Body className="container">
        
        
        {!prod.inStock ? (

          <div className="text-danger d-flex justify-content-center" >Out of Stock</div>
        ) : (
          <div className="d-flex justify-content-center" style={{ cursor: "pointer" }}>
            {cart.some((p) => p.id === prod.id) ? (
              <Button
                variant="default"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
                style={{backgroundColor: 'red', borderRadius: '1rem'}}
              >
                Remove From Cart
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: prod,
                  })
                }
                style={{backgroundColor: '#2dace4', borderRadius: '1rem', color: 'white'}}
              >
                Add to Cart
              </Button>
            )}
            <Button
              variant="success"
              onClick={handleBuyNowClick}
              style={{ marginLeft: "20px", borderRadius: '1rem' }}
            >
              Buy Now
            </Button>
          </div>
        )}
      </Card.Body>
      
    </Card>
  );
};

export default SingleProduct;
