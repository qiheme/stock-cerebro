import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import WatchList from "./WatchList";
import StockModal from "./StockModal";
import {
  Button,
  Card,
  CardColumns,
  Carousel,
  Col,
  Container,
  Form,
  Jumbotron,
  Row,
  Spinner,
} from "react-bootstrap";

import axios from "axios";
import "./News.css";

function News() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [searchedStock, setSearchedStock] = useState({});
  const [stocks, setStocks] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const searchNews = () => {
    axios.get(`/api/finnhub/general`).then((response) => {
      console.log(response);
      // TODO: Handle 429s from Finnhub
      setStocks(response.data);
      setLoading(false);
    });
  };

  const searchStock = () => {
    const symbol = document.getElementById("stock-input").value;
    axios.get(`/api/finnhub/quote/${symbol}`).then((response) => {
      console.log(response);
      response.data.symbol = symbol;
      setSearchedStock(response.data);
      setModalShow(true);
    });
  };

  const searchCompanyInfo = () => {
    const symbol = document.getElementById("stock-input").value;
    // axios
    //   .get(`/api/finnhub/news/${symbol}`)
    //   .then((response) => {
    //     console.log(response);
    //     response.data.symbol = symbol;
    //     setSearchedStock(response.data);
    //     setModalShow(true);
    //   });
  };

  const loaderStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyles = {
    height: "400px",
    width: "700px",
  };

  useEffect(searchNews, []);

  if (loading) {
    return (
      <div style={loaderStyles}>
        <Container>
          <Row style={{ textAlign: `center` }}>
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="News">
        <br />
        <Container className="container">
          <Row className="stock-row">
            <Col>
              <Row>
                {/* <Col></Col> */}
                <Col>
                  {/* <Carousel>
                    {stocks.map((stock, i) => {
                      if (i < 5) {
                        return (
                          <Carousel.Item>
                            <a href={stock.url} target="_blank">
                              <img
                                className="d-block w-100"
                                src={stock.image}
                                alt={stock.headline}
                                style={imageStyles}
                              />
                            </a>
                            <Carousel.Caption>
                              <h3>{stock.headline}</h3>
                            </Carousel.Caption>
                          </Carousel.Item>
                        );
                      }
                    })}
                  </Carousel> */}
                  <Card>
                    <Card.Body>
                      <Carousel activeIndex={index} onSelect={handleSelect}>
                        {stocks.map((stock, i) => {
                          if (i < 5) {
                            return (
                              <Carousel.Item>
                                <a href={stock.url} target="_blank">
                                  <img
                                    className="d-block w-100"
                                    src={stock.image}
                                    alt={stock.headline}
                                  />
                                </a>
                              </Carousel.Item>
                            );
                          }
                        })}
                      </Carousel>
                    </Card.Body>
                    <Card.Body>
                      <Card.Title>{stocks[index].headline}</Card.Title>
                      <Card.Text>{stocks[index].summary}</Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer> */}
                  </Card>
                </Col>
                {/* <Col></Col> */}
              </Row>

              <br></br>
              <Row className="watchlist-row">
                <Col>
                  <WatchList></WatchList>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>

              <CardColumns>
                {stocks.map((stock, i) => {
                  if (i >= 5) {
                    return (
                      <Col>
                        <NewsCard
                          img={stock.image}
                          link={stock.url}
                          title={stock.headline}
                          text={stock.summary}
                        ></NewsCard>
                      </Col>
                    );
                  }
                })}
              </CardColumns>
            </Col>
          </Row>
        </Container>
        <StockModal
          show={modalShow}
          stock={searchedStock}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  }
}

export default News;
