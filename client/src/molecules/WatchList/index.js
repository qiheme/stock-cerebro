import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import axios from 'axios';

const styles = {
  backgroundColor: '#D3D3D3',
  borderRadius: '7px',
};

export default function WatchList() {
  const [stocks, setStocks] = useState([]);

  const stockBadgeStatus = (stock) => {
    if (stock.c > stock.o) {
      return 'success';
    } else if (stock.c < stock.o) {
      return 'danger';
    }

    return 'secondary';
  };

  useEffect(() => {
    const watchListArr = ['NFLX', 'AAPL', 'CMCSA', 'TSLA', 'BA'];
    const stockRequestArr = [];

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
      <Table hover responsive="sm" style={styles}>
        <thead>
          <tr>
            <th colSpan="2">Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, i) => {
            return (
              <tr key={i}>
                <td>{stock.data.symbol}</td>
                <td>
                  <Badge variant={stockBadgeStatus(stock.data)}>
                    {stock.data.c.toFixed(2)}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
