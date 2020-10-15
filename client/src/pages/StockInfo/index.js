import { Button, Jumbotron } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const StockInfo = () => {
  const { stockId } = useParams();
  const [symbolState, setSymbolState] = useState({});

  const searchStock = (symbol) => {
    return axios.get(`/api/finnhub/quote/${symbol}`);
  };

  useEffect(() => {
    if (stockId) {
      searchStock(stockId).then((data) => {
        console.log(data);
        // setSymbolState(data);
      });
    }
  }, [stockId]);

  return (
    <div className="StockInfo">
      <Jumbotron>
        <h1>Data for </h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </div>
  );
};
