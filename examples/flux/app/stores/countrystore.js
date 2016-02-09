import uuid from "node-uuid";
import alt from "./alt";
import CountryActions from "./actions/actions";


class CountryStore {
  constructor(){
    this.bindActions(CountryActions);
    this.countries = [
      {"name": "Sweden", "id": uuid.v4()},
      {"name": "China", "id": uuid.v4()},
      {"name": "Peru", "id": uuid.v4()},
      {"name": "Czech Republic", "id": uuid.v4()},
      {"name": "Bolivia", "id": uuid.v4()}
    ];
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
