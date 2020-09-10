import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {
  Button,
  CardColumns,
  Carousel,
  Col,
  Container,
  Form,
  FormControl,
  Jumbotron,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

export default function WatchList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const watchListArr = ["NFLX", "AAPL", "CMCSA", "TSLA", "BA"];
    let stockRequestArr = [];
    for (let i = 0; i < watchListArr.length; i++) {
      stockRequestArr.push(axios.get(`/api/finnhub/quote/${watchListArr[i]}`));
    }
    Promise.all(stockRequestArr).then((stockResults) => {
      console.log(stockResults);
      setStocks(stockResults);
    });
  }, []);
  return (
    <>
      <Jumbotron>
        <Container>
          {stocks.map(stock => {
            return <Row>
              <Col>{stock.data.symbol}</Col>
              <Col>{stock.data.c}</Col>
            </Row>
          })}
        </Container>
      </Jumbotron>
    </>
  );
}
