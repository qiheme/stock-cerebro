import React, { useEffect, useState } from "react";
import Card from "./Card";
import StockModal from "./StockModal";
import { Button, CardColumns, Col, Container, Form, Jumbotron, Row, Spinner } from "react-bootstrap";

import axios from "axios";
import "./News.css";

function News() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [searchedStock, setSearchedStock] = useState({});
  const [stocks, setStocks] = useState([]);

  const searchNews = () => {
    axios
      .get(`/api/finnhub/general`)
      .then((response) => {
        console.log(response);
        setStocks(response.data);
        setLoading(false);
      });
  };

  const searchStock = () => {
    const symbol = document.getElementById("stock-input").value;
    axios
      .get(`/api/finnhub/quote/${symbol}`)
      .then((response) => {
        console.log(response);
        response.data.symbol = symbol;
        setSearchedStock(response.data);
        setModalShow(true);
      });
  };

  const loaderStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

  useEffect(searchNews, []);

  if (loading) {
    return (
      <div style={loaderStyles}>
        <Container>
          <Row style={{textAlign: `center`}}>
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
        <Container className="container">
          <Row className="stock-row">
            <Col>
              <Jumbotron>
                <h1>Hello, world!</h1>
                <p>This is a very simple Newslication to search stock news.</p>
                <Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        id="stock-input"
                        size="sm"
                        type="text"
                        placeholder="Please enter a stock"
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <p>
                  <Button type="submit" onClick={searchStock} variant="primary">
                    Search
                  </Button>
                </p>
              </Jumbotron>
              <br></br>
              <CardColumns>
                {stocks.map((stock) => {
                  return (
                    <Col>
                      <Card
                        img={stock.image}
                        link={stock.url}
                        title={stock.headline}
                        text={stock.summary}
                      ></Card>
                    </Col>
                  );
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
