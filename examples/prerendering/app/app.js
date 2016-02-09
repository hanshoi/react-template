import React from "react";
import $ from "jquery";
import DynamicSearch from "./dynamicsearch";


class App extends React.Component{
  constructor() {
    super();
    this.state =  {
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
  }

  componentDidMount() {
    // request countries information from server when component has mounted
    this.serverRequest = $.get(this.props.url, data => {
      if ( data.countries != undefined ) {
        this.setState({countries: data.countries});
      }
    }, "json");
  }

  componentWillUnmount() {
    // abort all ongoing ajax calls as not needed
    this.serverRequest.abort();
  }

  render() {
    let countries = this.state.countries;
    return (
        <DynamicSearch countries={countries} />
    );
  }
}

export default App;
