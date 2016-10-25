import React, { Component } from 'react';

class NavBarComponent extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Bar Hop</a>
          </div>

          <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-2" aria-expanded="false" styles={{height: '1px'}}>
            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Username" />
                <input type="text" className="form-control" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default  NavBarComponent;
