var React = require("react");
var ReactDOM = require("react-dom");


var Typewriter = React.createClass({
  getInitialState: function(){
    return {
      username: 'hanshoi'
    };
  },
  handleChange: function(e){
    this.setState({
      username: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        Hello {this.state.username} <br />
        Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
      </div>
    );
  }
});

ReactDOM.render(
  <Typewriter />,
  document.getElementById('app')
);
