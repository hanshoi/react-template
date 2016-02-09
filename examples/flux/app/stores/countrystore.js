import alt from "../alt";
import CountryActions from "../actions/actions";


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

  delete(name){
    this.setState({
      countries: this.countries.filter(country => country.name !== name)
    });
  }
}

export default alt.createStore(CountryStore, "CountryStore");
