import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Chat from "./component/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Chat} />
    </Router>
  );
}

export default App;
