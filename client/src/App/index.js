import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import News from "../News";
import NavBar from "../NavBar";

export default function App() {
  return (
    <Router>
      <div>
        {/* <Nav
          activeKey="/"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
        </Nav> */}
        <NavBar></NavBar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/">
            <News />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
