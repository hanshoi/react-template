/* 
Create parent component. 

Adds div tags and component Child when used.
Also passes the prop "name" to the child component.
*/
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
