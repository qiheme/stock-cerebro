import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import News from "../pages/News";
import NavBar from "../molecules/NavBar";
import React from "react";
import { StockInfo } from "../pages/StockInfo";

export default function App() {
  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <News />
          </Route>
          <Route path="/info/:stockId">
            <StockInfo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
