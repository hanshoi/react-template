import React from "react";
import DynamicSearch from "./dynamicsearch";
import CountryEditor from "./countryeditor";
import CountryStore from "../stores/countrystore";



class App extends React.Component{
  constructor() {
    super();
    this.state = CountryStore.getState();
    this.storeChanged = (state) => {
      this.setState(state);
    };
  }

  componentDidMount() {
    CountryStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    CountryStore.unlisten(this.storeChanged);
  }

  render() {
    let countries = this.state.countries;
    return (
      <div>
        <DynamicSearch countries={countries} />
        <CountryEditor />
      </div>
    );
  }
}

export default App;
