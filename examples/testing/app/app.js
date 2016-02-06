var React = require('react');
var ReactDOM = require('react-dom');
var DynamicSearch = require('./dynamicsearch.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      countries: [
        {"name": "Sweden"}, {"name": "China"}, {"name": "Peru"}, {"name": "Czech Republic"},
        {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
        {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
        {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
        {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
        {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
        {"name": "Spain"}, {"name": "Poland"}, {"name": "Haiti"}
      ]
    };
  },

  render: function(){
    var countries = this.state.countries;
    return (
        <DynamicSearch countries={countries} />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
