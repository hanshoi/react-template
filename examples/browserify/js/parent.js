/*
  We need to require child module before using it.
  Also to have our Parent component usable in app.js we need to export it.
*/
var Child = require('./child.js');
var Parent = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="child"/>
      </div>
    )
  }
});
module.exports = Parent;
