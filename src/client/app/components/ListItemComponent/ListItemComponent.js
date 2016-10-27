import React, { Component } from 'react';
import styles from './styles';

class ListItemComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      going: 0,
      isBooked: false
    }
  }

  toggleBooking() {
    this.setState((prev, props) => {
      return { isBooked: !prev.isBooked }
    })
  }

  componentDidMount() {
    this.howManyAttendees();
  }

  howManyAttendees() {
    let bookings = this.props.bookings;
    let company  = bookings.filter((booking) => {
      return booking.company == this.props.name;
    });
    if(company.length == 0) {
      return;
    } else {
      if(company[0].attendees.indexOf('580dd7a53d246ba866604ddb') != -1) {
        this.toggleBooking();
      }
      this.setState({going: company[0].attendees.length});
    }
  }

  makeABooking() {
    axios.post('http://localhost:3000/users/580dd7a53d246ba866604ddb/bookings', {
      company: this.props.name
    })
    .then((data) => {
      console.log(data.data.message);
      if(data.data.message != 'already attending!') {
        this.setState((prev, props) => {
          return { going: prev.going + 1 };
        });
      }
      this.toggleBooking();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  unDoABooking() {
    axios.delete('http://localhost:3000/users/580dd7a53d246ba866604ddb/bookings/'
          + this.props.name
    )
    .then((data) => {
      console.log(data.data.message);
      if(data.data.message != 'not attending!') {
        this.setState((prev, props) => {
          return { going: prev.going - 1}
        });
      }
      this.toggleBooking();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <li style={styles.li} className="row">
        <div className="col-md-2">
          <img style={styles.img} src={this.props.image_url}/>
        </div>
        <div className="col-md-10">
          <h3>{this.props.name}</h3>
          <button onClick={ this.state.isBooked ? this.unDoABooking.bind(this) :
                            this.makeABooking.bind(this)  }
                  >{ this.state.going } Going</button>
          <p>{this.props.snippet_text}</p>
        </div>
      </li>
    )
  }
}

export default ListItemComponent;
