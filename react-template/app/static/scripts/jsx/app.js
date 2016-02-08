var React = require("react");
var ReactDOM = require("react-dom");


var Helloworld = React.createClass({
  render: function(){
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
});


ReactDOM.render(
  <Helloworld name="World" />,
  document.getElementById('content')
);
