import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer style={{clear: 'both', marginTop: '120px'}} className="footer text-center">
        <div className="container">
          <a target="_blank" href="https://github.com/alemneh/Night-Life-Scene"><i className="fa fa-github"></i></a>
          <p className="text-muted">Powered by Yelp API.</p>
        </div>

      </footer>
    )
  }

}

export default Footer;
