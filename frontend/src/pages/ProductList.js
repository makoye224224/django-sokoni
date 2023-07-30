import React, { useEffect, useState } from "react";
import SingleProductList from "../components/SingleProductList";
import {
  Button,
  Card,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStateContext } from "../context/Context";

const ProductList = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    handleNextPage,
    handlePrevPage,
    nextPageUrl,
    handleSearch,
    isSearching,
    setNextPageUrl,
    prevPageUrl,
    setPrevPageUrl,
    Collections,
  } = useStateContext();

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="container">
        <section>
          <div className="text-center">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Search Product"
                name="searchQuery"
                value={searchQuery}
                onChange={onChange}
                onKeyDown={(e)=>{
                  if (e.key === "Enter"){
                    handleSearch()
                  }
                }}
                required
              />
              <div
                class="input-group-prepend"
                onClick={handleSearch}
                
                style={{ cursor: "pointer" }}
              >
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  <SearchIcon style={{ scale: "200%" }} />
                </span>
              </div>
            </div>

            <br />

            {!isSearching && (
              <Carousel>
                <CarouselItem>
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <img
                      src="https://shorturl.at/anvRS"
                      className="card-img-top"
                      alt="product photo"
                      loading="lazy"
                      style={{ borderRadius: "1rem", objectFit: "contain" }}
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <img
                      src="https://rb.gy/gyqgo"
                      className="card-img-top"
                      alt="product photo"
                      loading="lazy"
                      style={{ borderRadius: "1rem", objectFit: "contain" }}
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <img
                      src="https://rb.gy/t1cds"
                      className="card-img-top"
                      alt="product photo"
                      loading="lazy"
                      style={{ borderRadius: "1rem", objectFit: "contain" }}
                    />
                  </div>
                </CarouselItem>
              </Carousel>
            )}
          </div>
        </section>
        <br />
        {products.length > 0 ?
        <><section>
            <div>
              <Row>
                {products.map((prod) => (
                  <Col key={prod.id} lg={4} md={6} xs={12}>
                    <SingleProductList prod={prod} />
                    <br />
                  </Col>
                ))}
              </Row>
            </div>
          </section><section>
              <div className="text-center mt-3">
                <Row className="justify-content-center">
                  <Col xs="auto" className="px-2">
                    {prevPageUrl && (
                      <Button
                        style={{ borderRadius: "1rem" }}
                        onClick={handlePrevPage}
                      >
                        Previous
                      </Button>
                    )}
                  </Col>
                  <Col xs="auto" className="px-2">
                    {nextPageUrl && (
                      <Button
                        style={{ borderRadius: "1rem" }}
                        onClick={handleNextPage}
                      >
                        Next
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </section></>
        : <div className="text-center">
          <h4 style={{color: 'red'}} >Out of Stock</h4>
          <br/>
          <a href="/"><h5>Home</h5></a>
        </div>  }
        <br />
      </div>
    </>
  );
};

export default ProductList;
