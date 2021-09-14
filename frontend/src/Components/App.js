import React from "react";
import Header from "./Header";
import Content from "./Content";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
        <Header />
        <Content />
    </React.Fragment>
);
}

export default App;
