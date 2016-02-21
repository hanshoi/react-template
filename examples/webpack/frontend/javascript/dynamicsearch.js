import React, {Component} from "react";
import $ from "jquery";

export default class DynamicSearch extends Component ({
  constructor() {
    super();
    this.state = { searchString: "", url: "", countries: [] };
    this._handleUpdate = this._handleUpdate.bind(this);
  }

  componentDidMount() {
    // request countries information from server when component has mounted
    this.serverRequest = $.get($ROOT_URL + this.props.url, (data) => {
      if ( data.countries != undefined ) {
        this.setState({countries: data.countries});
      }
    }, "json");
  }

  componentWillUnmount(){
    // abort all ongoing ajax calls as not needed
    this.serverRequest.abort();
  }

  _handleUpdate(event) {
    this.setState({
      searchString: event.target.value
    });
  }

  getFilteredCountries() {
    let countries = this.state.countries;
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
          { countries.map(function(country, index){ return <li key={index} >{country.name}</li> }) }
        </ul>
      </div>
    );
  }
});

