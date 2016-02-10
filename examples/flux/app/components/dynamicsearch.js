import React from "react";

class DynamicSearch extends React.Component {
  constructor() {
    super();
    this.state = { searchString: "" };
    this._handleUpdate = this._handleUpdate.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  _handleUpdate(event) {
    this.setState({
      searchString: event.target.value
    });
    console.log("Updated countries list.");
  }

  getFilteredCountries() {
    let countries = this.props.countries;
    let searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      countries = countries.filter(country => {
        return country.name.toLowerCase().match( searchString );
      });
    }
    return countries;
  }

  render() {
    let countries = this.getFilteredCountries();

    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this._handleUpdate} placeholder="search" />
        <ul>
          { countries.map(function(country, index){ return <li key={index} >{country.name}
                                                    <button name={country.name} onClick={this.deleteCountry}>Delete</button>
                                                    </li> }) }
        </ul>
      </div>
    );
  }

  deleteCountry(event) {
    CountryActions.delete(event.target.name);
  }

}

export default DynamicSearch;
