import React, { Component } from 'react';

class ListItemComponent extends Component {
  render() {
    return (
      <li className="row">
        <div className="col-md-2">
          <img src="https://s3-media2.fl.yelpcdn.com/bphoto/m4hfcLhvJbEGdbgI3DhvqA/ms.jpg"/>
        </div>
        <div className="col-md-10">
          <h3>Some Random Bar</h3>
          <button>0 Going</button>
          <p>
            "We were a group of 3 couples who came to
            Seattle for a mini vacation and I must say this
             place lives up to all the incredible reviews.
             I was impressed how..."
          </p>
        </div>
      </li>
    )
  }
}

export default ListItemComponent;
