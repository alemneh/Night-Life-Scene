import React, { Component } from 'react';
import NavBarComponent from './components/NavBarComponent/NavBarComponent';
import SearchListComponent from './components/SearchListComponent/SearchListComponent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://bar-hop-bar.herokuapp.com/'
    }
  }
  render() {
    return (
      <div className="container">
        <NavBarComponent url={this.state.url} />
        <SearchListComponent url={this.state.url}/>
      </div>
    );
  }
}


export default  App;
