import "./base.css";

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.js";
// import App from 'react-router-dom/examples/Basic'
// import App from './components/examples/Basic'

ReactDOM.render(<App />, document.getElementById("app"));
