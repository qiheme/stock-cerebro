import React, { useEffect, useState } from 'react';
import NewsCard from '../../molecules/NewsCard';
import WatchList from '../../molecules/WatchList';
import StockModal from '../../molecules/StockModal';
import {
  Card,
  CardColumns,
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useAppContext } from '../../store/GlobalState';
import { searchNews } from '../../utils';

import './News.css';

function News() {
  const [state, dispatch] = useAppContext();

  const [modalShow, setModalShow] = useState(false);
  const [searchedStock] = useState({});
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const loaderStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  useEffect(() => {
    let mounted = true;

    searchNews().then((response) => {
      if (mounted) {
        dispatch({ type: 'FETCH_NEWS_SUCCESS', payload: response.data });
        dispatch({ type: 'LOADING_COMPLETE' });
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [dispatch]);

  if (state.page.status.loading) {
    return (
      <div style={loaderStyles}>
        <Container>
          <Row style={{ textAlign: 'center' }}>
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
    <div className="News">
      <br />
      <Container className="container">
        <Row className="stock-row">
          <Col>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                      {state.data.news.response.map((stock, i) => {
                        return i < 5 ? (
                          <Carousel.Item key={i}>
                            <a
                              href={stock.url}
                              target="_blank"
                              rel="noreferrer"
                              key={i}
                            >
                              <img
                                className="d-block w-100"
                                src={stock.image}
                                alt={stock.headline}
                                key={i}
                              />
                            </a>
                          </Carousel.Item>
                        ) : null;
                      })}
                    </Carousel>
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>
                      {state.data.news.response[index].headline}
                    </Card.Title>
                    <Card.Text>
                      {state.data.news.response[index].summary}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
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
              {state.data.news.response.map((stock, i) => {
                if (i >= 5) {
                  return (
                    <Col key={i}>
                      <NewsCard
                        img={stock.image}
                        link={stock.url}
                        title={stock.headline}
                        text={stock.summary}
                        key={i}
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

export default News;
