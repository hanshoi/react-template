import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(
  <App url="/api/countries" />,
  document.getElementById('content')
);
