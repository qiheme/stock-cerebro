import React from 'react';
import { Card } from 'react-bootstrap';

function NewsCard({ img, link, title, text }) {
  return (
    <div className="Card">
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        <Card.Link href={link}>Link</Card.Link>
      </Card>
    </div>
  );
}

export default NewsCard;
