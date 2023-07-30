import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ProductForm from '../ProductForm';
import SingleProduct from './SingleProduct';
import Rating from './Rating';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyProducts = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

  const history = useHistory();
  const [inventory, setInventory] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async (token, setProducts) => {
    try {
      const response = await axios.get('https://sokoni-server.onrender.com/api/products/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData(token, setProducts);
  }, [products]);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <>
      <Container>
      <h1 className='amazing-heading text-center'>
  {user && `${user.first_name} ${user.last_name}`}{' '}
  <FontAwesomeIcon icon={faArrowRight} /> {user && user.business_name}
    </h1>
        <Button
          variant="default"
          className="btn btn-block btn-default"
          style={{
            backgroundColor: '#2dace4',
            color: 'white',
            borderRadius: '2rem',
          }}
          onClick={() => {
            const productForm = document.getElementById('product-id');
            productForm.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Add A Product
        </Button>
        <br />
        <Row>
          {memoizedProducts.map((prod) => (
              <Col key={prod._id} lg={4} md={6} xs={12}>
                <Card
                  style={{
                    borderRadius: '2rem',
                    backgroundColor: '#FFF5EE',
                    boxShadow: '5px 5px 2px rgba(10, 10, 10, 0.5)',
                    overflow: 'hidden',
                    height: '34rem',
                    maxWidth: '25rem'
                  }}
                >
                  <br />
                  <a
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      history.push(`/product-details/${prod._id}`);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Title
                      className="container-fluid"
                      style={{ width: '370px', height: '310px', }}
                    >
                      <img
                        src={prod && prod.imageUrls[0]}
                        className="img-fluid"
                        alt="product photo"
                        loading="lazy"
                        style={{
                          borderRadius: '1rem',
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 container">
                      <div
                        className="d-flex flex-wrap"
                        style={{ fontWeight: 'bold' }}
                      >
                        <div className="flex-grow-1">
                          <p className="d-inline container">
                            {prod && prod.title}
                          </p>
                        </div>
                        <div>
                          <p className="d-inline container">
                            $ {prod && prod.unit_price}
                          </p>
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
                      <p
                        className="container"
                        style={{
                          width: '100%',
                          height: '1.6rem',
                          overflow: 'hidden',
                        }}
                      >
                        {prod && prod.description}
                      </p>
                    </Card.Text>

                    <div
                      className="d-flex justify-content-center"
                      style={{ scale: '120%' }}
                    >
                      <Rating rating={prod.ratings} />
                    </div>
                  </a>
                  <Card.Body className="container">
                    {!prod.inventory ? (
                      <div className="text-danger d-flex justify-content-center">
                        Out of Stock
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        variant="default"
                        className="btn btn-default"
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '2rem',
                        }}
                        onClick={() => setShowForm(!showForm)}
                      >
                        Delete
                      </Button>
                    
                      <Button
                        variant="default"
                        className="btn btn-default"
                        style={{
                          backgroundColor: '#2dace4',
                          color: 'white',
                          borderRadius: '2rem',
                        }}
                        onClick={() => setShowForm(!showForm)}
                      >
                        Update
                      </Button>
                    </div> 
                    )}
                  </Card.Body>
                </Card>
                <br />
                <br />
              </Col>
            ))}
        </Row>
          <div id="product-id">
            <ProductForm />
          </div>
      </Container>
    </>
  );
};

export default MyProducts;
