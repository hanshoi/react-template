import uuid from "node-uuid";
import alt from "./alt";
import CountryActions from "./actions/actions";


class CountryStore {
  constructor(){
    this.bindActions(CountryActions);
    this.countries = [];
  }

  create(country){
    const countries = this.countries;
    country.id = uuid.v4();
    this.setState({
      countries: countries.concat(country)
    });
  }

  update(updatedCountry){
    const countries = this.countries.map(country => {
      if(country.id === updatedCountry.id) {
        return Object.assign({}, country, updatedCountry);
      }
      return country;
    });

    this.setState({countries});
  }

  delete(id){
    this.setState({
      countries: this.countries.filter(country => country.id !== id)
    });
  }
}

export default alt.createStore(CountryStore, "CountryStore");
