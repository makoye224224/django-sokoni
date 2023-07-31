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
  return(
    <div>hello world</div>
  )

  }
export default Home;
