import React from "react";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">LOC Investments Inc.</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search for Stock"
            className="mr-sm-2"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
    </>
  );
}