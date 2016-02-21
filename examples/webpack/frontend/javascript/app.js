import React from "react";
import ReactDOM from "react-dom";
import DynamicSearch from "./dynamicsearch";

ReactDOM.render(
  <DynamicSearch url='/api/countries' />,
  document.getElementById('content')
);
