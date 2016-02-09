var React = require('react');

var DynamicSearch = React.createClass ({
  getInitialState: function(){
    return {
      searchString: ''
    };
  },

  handleUpdate: function(event) {
    this.setState({
      searchString: event.target.value
    });
    console.log("Updated countries list.");
  },

  getFilteredCountries: function() {
    var countries = this.props.countries;
    var searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      countries = countries.filter(function(country){
        return country.name.toLowerCase().match( searchString );
      });
    }
    return countries;
  },

  render: function() {
    var countries = this.getFilteredCountries();

    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleUpdate} placeholder="awesome!" />
        <ul>
          { countries.map(function(country, index){ return <li key={index} >{country.name}</li> }) }
        </ul>
      </div>
    );
  }
});

module.exports = DynamicSearch;
