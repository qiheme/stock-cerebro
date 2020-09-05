import React from "react";
import { Button, Card as BCard } from "react-bootstrap";

function Card({img, link, title, text, width}) {
  return (
    <div className="Card">
      <BCard style={{ width: '100%' }}>
        <BCard.Img variant="top" src={img} />
        <BCard.Body>
          <BCard.Title>{title}</BCard.Title>
          <BCard.Text>
            {text}
          </BCard.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </BCard.Body>
        <BCard.Link href={link}>Link</BCard.Link>
      </BCard>
    </div>
  );
}

export default Card;
