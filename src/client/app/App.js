import React, { Component } from 'react';
import NavBarComponent from './components/NavBarComponent/NavBarComponent';
import SearchListComponent from './components/SearchListComponent/SearchListComponent';


class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBarComponent />
        <div id="spill" className="text-center">
          <h1>Plans tonight?</h1>
          <p>Bar hop with a plan tonight and RSVP ahead of time!</p>
          <p>Remember: don't drink and drive.</p>
        </div>
        <SearchListComponent />
      </div>
    );
  }
}


export default  App;
