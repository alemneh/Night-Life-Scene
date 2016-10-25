import React, { Component } from 'react';
import NavBarComponent from './components/NavBarComponent/NavBarComponent';
import SearchListComponent from './components/SearchListComponent/SearchListComponent';


class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBarComponent />
        <SearchListComponent />
      </div>
    );
  }
}


export default  App;
