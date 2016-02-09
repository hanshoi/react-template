var React = require("react");
var ReactDOM = require("react-dom");
var Helloworld = require("./hello.js");

ReactDOM.render(
  <Helloworld name="World" />,
  document.getElementById('content')
);
