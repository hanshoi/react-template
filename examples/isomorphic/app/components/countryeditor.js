import React from "react";
import CountryActions from "../actions/actions";


class CountryEditor extends React.Component {
  constructor() {
    super();
    this._handleUpdate = this._handleUpdate.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.state = { name: ''};
  }

  _handleUpdate(event) {
    this.setState({
      name: event.target.value
    });
    console.log("Updated country name");
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this._handleUpdate} placeholder="country name here.." />
        <button onClick={this.addCountry}>Create</button>
      </div>
    );
  }

  addCountry() {
    CountryActions.create(this.state.name);
  }

}

export default CountryEditor;
