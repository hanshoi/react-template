
var DynamicSearch = React.createClass ({
  getInitialState: function(){
    return {
      searchString: ''
    }
  },
  handleUpdate: function(event) {
    this.setState({
      searchString: event.target.value
    });
    console.log("Updated countries list.")
  },
  render: function() {
    var countries = this.props.items;
    var searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      countries = countries.filter(function(country){
        return country.name.toLowerCase().match( searchString );
      });
    }

    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleUpdate} placeholder="awesome!" />
        <ul>
          { countries.map(function(country, index){ return <li key={index} >{country.name}</li> }) }
        </ul>
      </div>
    )
  }
});

// list of countries, defined with JavaScript object literals
var countries = [
  {"name": "Sweden"}, {"name": "China"}, {"name": "Peru"}, {"name": "Czech Republic"},
  {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
  {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
  {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
  {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
  {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
  {"name": "Spain"}, {"name": "Poland"}, {"name": "Haiti"}
];


ReactDOM.render(
  <DynamicSearch items={countries} />,
  document.getElementById('content')
);
