import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantItem from '../components/restaurant_item_component';


class RetaurantList extends Component {
  renderList() {
    let selectedJob = this.props.activeJob,
        chunkedArr = [];   

    return this.props.activeYelp.map((restaurant) => {
      return (
        <RestaurantItem
          key = { restaurant.id }
          restaurant = { restaurant }
          selectedJob = { selectedJob } />
      );
    });
  }

  render() {
    return (
      (this.props.loading) ?
      <div className="restaurantContainer">
        <i className="fa fa-cog fa-spin fa-5x fa-fw"></i> Loading...
      </div> :
      <div className="restaurantContainer">
        <div>
          <h5>
            <a href="https://www.yelp.com" target="_blank">
              <i className="fa fa-yelp" aria-hidden="true" alt="Yelp corporate logo (black glyph icon)"></i>
            </a> Nearby Eats
          </h5>
        </div>
        <div className="overlay">
          <ul className="restaurantList container">
            { this.renderList() }
          </ul>
        </div>
      </div>
    ); 
  }
}

let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeYelp: state.activeYelp,
  loading: state.loading
});

export default connect(mapStateToProps)(RetaurantList);
