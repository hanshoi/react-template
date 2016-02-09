import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Helloworld from "./hello";

ReactDOM.render(
  <Helloworld name="World" />,
  document.getElementById('content')
);
