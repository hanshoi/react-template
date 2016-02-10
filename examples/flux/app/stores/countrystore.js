import alt from "../alt";
import CountryActions from "../actions/actions";


class CountryStore {
  constructor(){
    this.bindActions(CountryActions);
    this.countries = [];
  }

  create(name){
    const countries = this.countries;
    country.name = name;
    this.setState({
      countries: countries.concat(country)
    });
  }

  delete(name){
    console.log("deleting country "+name);
    this.setState({
      countries: this.countries.filter(country => country.name != name)
    });
  }
}

export default alt.createStore(CountryStore, "CountryStore");
