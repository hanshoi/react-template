/*
  Export our child component to enable its usage from outside ths commonjs module.
*/
var Child = React.createClass({
  render: function(){
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
      </div>
    )
  }
});
module.exports = Child;
