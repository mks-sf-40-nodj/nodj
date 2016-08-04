import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchJobs } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    // We need to go and fetch job data
    this.props.fetchJobs(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form id="searchForm" onSubmit={this.onFormSubmit}>
        <div className="box">
          <div className="container-3">
              <input 
                id="search" 
                type="search" 
                results="4" 
                autoSave="Developer Jobs" 
                placeholder="Search..."
                value={this.state.term}
                onChange={this.onInputChange} />
                
              <span className="icon"><i className="fa fa-search"></i></span>
          </div>
        </div>
      </form>
    );
  }
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
