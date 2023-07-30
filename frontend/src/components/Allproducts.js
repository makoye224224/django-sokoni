import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

const Allproducts = () => {
    const[products, setProducts] = useState([])

    const fetchData = async()=>{
    const response = await axios.get('https://sokoni-server.onrender.com/api/products/all')
    setProducts(response.data)
}
  return (
    <>
    <Container>
        
    </Container>
      
    </>
  )
}

export default Allproducts
