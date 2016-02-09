var React = require("react");


var Helloworld = React.createClass({
  render: function(){
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
});

module.exports = Helloworld;
