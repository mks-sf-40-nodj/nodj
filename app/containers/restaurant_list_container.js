import React, { Component } from 'react';

import RestaurantItem from '../components/restaurant_item_component';

class RetaurantList extends Component {
  // constructor(props) {
    // super(props);

    // this.state = {restaurant: dummyData};
  // }
  //renderList
  // renderList() {
    // return this.state.restaurant.map(function(restaurant) {
      // return (
      //   <RestaurantItem />
      // );
    // });
  // }

  render() {
    return (
      <div id="restaurantContainer">
        <h4>Restaurant List Container</h4>
        <ul className="restaurantList">
          
        </ul>
      </div>
    ); 
  }
}

export default RetaurantList;