import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch job data
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input 
          placeholder="Search for a job"

          type="search"
          className="searchBar"

          type="search"
          className="searchBar"
          value={ this.state.term }
          onChange={ this.onInputChange } />
        <button type="submit">Search</button>
      </form>
    );
  }
};

export default SearchBar;
