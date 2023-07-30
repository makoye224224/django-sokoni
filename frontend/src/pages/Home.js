import React, { useState, useEffect } from 'react';
import { Card, Carousel, CarouselItem, Col, Container, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import {  useStateContext } from '../context/Context';
import Filters from '../components/Filters';
import SingleProduct from '../components/SingleProduct';
import CarouselComponent from '../components/CarouselComponent';
import FilterModal from '../components/FilterModal';
import { BsSearch } from 'react-icons/bs';
import { useMediaQuery } from '@mui/material';
import ProductForm from '../ProductForm';
import axios from 'axios';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const[productList, setProductList] = useState([])
  const postsPerPage = 30;
  const maxPageNumbers = 5;

  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } =  useStateContext();

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } =  useStateContext();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = transformProducts().slice(indexOfFirstPost, indexOfLastPost);


  const pageNumbers = Math.ceil(products.length / postsPerPage);
  const startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, pageNumbers);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/store/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductList(data); // Set the received product data to the array
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log(error)
      });
  }, []);
  console.log('product list', productList)

  return (
    <>
    <section>
    <Container fluid className='d-flex justify-content-center align-items-center'>  
    <Card style={{borderRadius: '2rem', backgroundColor: '#FFF5EE', boxShadow: '5px 5px 2px rgba(10, 10, 10, 0.5)', width: isSmallScreen ? '100%' : '40%', height: '100%', overflow: 'hidden'}}>
      <Carousel>
        {products.map((prod) =>(
          <CarouselItem>
          <img 
          src= {prod && prod.image} 
          className="img-fluid image-container image" 
          alt="product photo"
          loading="lazy"
          style={{ borderRadius: '1rem', height: isSmallScreen ? '100%' : '23rem', width: isSmallScreen ? '100%' : '35rem', objectFit: 'cover'}} 
          />
           </CarouselItem>
        ))}
      </Carousel>
      </Card>
    </Container>
    </section>
    <br/>
    <section>
      <Container className="d-flex justify-content-center align-items-center">
      <FilterModal />
    </Container>
    </section>
    
      <br />
      <section>
        <Container>
          <Row className="d-flex justify-content-center">
            {currentPosts.map((prod) => (
              <Col key={prod.id} lg={4} md={4} xs={12}>
                <SingleProduct prod={prod} />
                <br />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <div className="d-flex justify-content-center my-3">
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: pageNumbers }, (_, index) => index + 1)
              .slice(startPage - 1, endPage + 1)
              .map((number) => (
                <Pagination.Item
                  key={number}
                  active={currentPage === number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumbers}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(pageNumbers)}
              disabled={currentPage === pageNumbers}
            />
          </Pagination>
        </div>
      </section>
      
    </>
  );
};


export default Home;
