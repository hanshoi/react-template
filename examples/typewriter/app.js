var React = require("react");
var ReactDOM = require("react-dom");


var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: "Antti Ruotsalainen",
      friends: ["Stephen", "Olli", "Liu"]
    };
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    })
  },
  render: function(){
    return (
      <div>
        <h1>Name: {this.state.name}</h1>
        <AddFriend addFriend={this.addFriend} />
        <ShowFriends friends={this.state.friends} />
      </div>
    );
  }
});

var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    };
  },
  propTypes: function(){
    addNew: React.PropTypes.func.isRequired
  },
  updateFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleNewFriend: function(e){
    this.props.addFriend(this.state.newFriend);
    this.setState({newFriend: ''});
  },
  render: function(){
    return (
      <div>
        <h3>Add Friend</h3>
        <input type="text" value={this.state.newFriend} onChange={this.updateFriend} />
        <button onClick={this.handleNewFriend}>Add Friend</button>
      </div>
    );
  }
});

var ShowFriends = React.createClass({
  getDefaultProps: function(){
    return {
      friends: []
    };
  },
  render: function(){
    var listItems = this.props.friends.map(function(friend){
      return <li>{friend}</li>;
    });
    return (
      <div>
        <h3>Friends</h3>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
});


ReactDOM.render(
  <FriendsContainer />,
  document.getElementById('app')
);
