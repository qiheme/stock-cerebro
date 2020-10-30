import {Col, Container, Jumbotron, Row, Spinner} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useAppContext} from '../../store/GlobalState';

export const StockInfo = () => {
  const {stockId} = useParams();
  const [state, dispatch] = useAppContext();

  const [symbolState, setSymbolState] = useState({});

  const searchStock = (symbol) => {
    return axios.get(`/api/finnhub/quote/${symbol}`);
  };

  const loaderStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  useEffect(() => {
    if (stockId) {
      searchStock(stockId).then((data) => {
        console.log(data);
        setSymbolState(data);
        dispatch({type: 'LOADING_COMPLETE'});
      });
    }
  }, [dispatch, stockId]);

  if (state.page.status.loading) {
    return (
      <div style={loaderStyles}>
        <Container>
          <Row style={{textAlign: 'center'}}>
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="StockInfo">
      <Jumbotron>
        {/* <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p> */}
        <Container className="container">
          <Row>
            <Col>
              <h1>{stockId}</h1>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};
