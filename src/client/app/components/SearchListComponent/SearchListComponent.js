import React, { Component } from 'react';
import ListItemComponent from '../ListItemComponent/ListItemComponent';
import styles from './styles';

class SearchListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      receivedBussiness: false,
      searchLoading: false,
      bookings: []
    }

  }

  componentDidMount() {
    this.getBizsWithBookings();

  }

  getBizsWithBookings() {
    axios.get(process.env.URL +'/bookings')
    .then((data) => {
      this.setState({bookings: data.data.bookings});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderListItems() {
    let businesses = this.state.businesses;
    if(businesses.length == 0) {
      return (
        <h2>No Results.</h2>
      )
    } else {
      return businesses.map((bar, index) => {
        return <ListItemComponent {...bar} key={index}
                  bookings={this.state.bookings} />
      })
    }
  }

  searchBars(e) {
    e.preventDefault();
    axios.post(process.env.URL + '/yelp-search', {
      location: this.refs.searchInput.value || 'seattle'
    })
    .then((data) => {
      let businesses = data.data.businesses;
      this.setState({businesses: data.data.businesses});

    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <form>
          <div className="row">
            <div className="col-md-10 ">
              <input ref="searchInput" style={styles.input}  className="form-control input-lg" type="text" placeholder="search your city..." />
            </div>
            <div className="col-md-2 mobileBtn">
              <button id="searchBtn" style={styles.button} onClick={this.searchBars.bind(this)}>Search</button>
            </div>
          </div>
        </form>
        <ul style={styles.ul}>
          {this.renderListItems()}
        </ul>
      </div>
    );
  }
}

export default SearchListComponent;
