
var DynamicSearch = React.createClass ({
  getInitialState: function(){
    return {
      searchString: '',
      url: '',
      countries: []
    }
  },
  componentDidMount: function() {
    // request countries information from server when component has mounted
    this.serverRequest = $.get($ROOT_URL + this.props.url, function(data){
      if ( data.countries != undefined ) {
        this.setState({countries: data.countries});
      }
    }.bind(this), "json");
  },
  componentWillUnmount: function(){
    // abort all ongoing ajax calls as not needed
    this.serverRequest.abort();
  },
  handleUpdate: function(event) {
    this.setState({
      searchString: event.target.value
    });
    console.log("Updated countries list.")
  },
  render: function() {
    var countries = this.state.countries;
    var searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      countries = countries.filter(function(country){
        return country.name.toLowerCase().match( searchString );
      });
    }

    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleUpdate} placeholder="awesome!" />
        <ul>
          { countries.map(function(country, index){ return <li key={index} >{country.name}</li> }) }
        </ul>
      </div>
    )
  }
});


ReactDOM.render(
  <DynamicSearch url='/api/countries' />,
  document.getElementById('content')
);
