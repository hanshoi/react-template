var React = require("react");
var ReactDOM = require("react-dom");


var Typewriter = React.createClass({
  getInitialState: function() {
    return {
      username: "hanshoi"
    };
  },
  handleChange: function(e) {
    this.setState({
      username: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        <p>Hello {this.state.username}</p>
        Change name: <input type="text" value={value.state.username} onChange={this.handleChange} />
      </div>
    )
  }
});


ReactDOM.render(<Typewriter />, document.getElementById('app'));
