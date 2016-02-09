import React from "react";
import $ from "jquery";
import DynamicSearch from "./dynamicsearch";
import CountryStore from "../stores/countrystore";
import CountryActions from "../actions/actions";


class App extends React.Component{
  constructor() {
    super();
    this.state = CountryStore.getState();
  }

  componentDidMount() {
    CountryStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    CountryStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state);
  };

  render() {
    let countries = this.state.countries;
    return (
        <DynamicSearch countries={countries} />
    );
  }

  addCountry() {
    CountryActions.create({"name": "Anttinia"});
  }

  deleteCountry(id) {
    CountryActions.delete(id);
  }

  editCountry(id, name) {
    CountryActions.update({ id, name });
  }
}

export default App;
