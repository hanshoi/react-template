/*
Create child component.

Adds div tag where using the prop.name
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
