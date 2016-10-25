import React, { Component } from 'react';
import ListItemComponent from '../ListItemComponent/ListItemComponent';

class SearchListComponent extends Component {
  render() {
    return (
      <div>
        <input  className="form-control input-lg" type="text" placeholder="search your city..." />
        <ul>
          <ListItemComponent />
        </ul>
      </div>
    );
  }
}

export default SearchListComponent;
