import React, { Component } from 'react';
import styles from './styles';

class ListItemComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      going: 0,
      isBooked: false,
      error: null,
    }

    this.unDoABooking = this.unDoABooking.bind(this);
    this.makeABooking = this.makeABooking.bind(this);
  }


  toggleBooking() {
    this.setState((prev, props) => {
      return { isBooked: !prev.isBooked }
    })
  }

  componentDidMount() {
    this.howManyAttendees();
  }

  renderError() {
    if(!this.state.error) { return null }

    window.setTimeout(() => {
      this.setState({ error: null});
    }, 2000)

    return <div className="alert alert-dismissible alert-danger">
             <button type="button" className="close" data-dismiss="alert">&times;</button>
             {this.state.error}
           </div>
  }

  howManyAttendees() {
    let bookings = this.props.bookings;
    let company  = bookings.filter((booking) => {
      return booking.company == this.props.name;
    });
    if(company.length == 0) {
      return;
    } else {
        this.setState({going: company[0].attendees.length});
    }
  }

  makeABooking() {
    if(!localStorage.token) {
      this.setState({ error: 'You must login!'});
      return;
    }
    let user = JSON.parse(localStorage.user);
    let userId = user._id;
    axios.post(process.env.URL + '/users/' + userId + '/bookings',
    { company: this.props.name },
    { headers: {'token': localStorage.token }})
    .then((data) => {
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
    if(!localStorage.token) {
      this.setState({ error: 'You must login!'});
      return;
    }
    let user = JSON.parse(localStorage.user);
    let userId = user._id;
    axios.delete(process.env.URL + '/users/' + userId + '/bookings/'
          + this.props.name,
    { headers: {'token': localStorage.token }})
    .then((data) => {
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
        { this.renderError() }
        <div className="col-md-2">
          <img style={styles.img} src={this.props.image_url}/>
        </div>
        <div className="col-md-10">
          <h3>{this.props.name}</h3>
          <button className="btn btn-primary btn-xs mobileBtn" onClick={ this.state.isBooked ? this.unDoABooking.bind(this) :
                            this.makeABooking.bind(this)  }>
          <span className="badge">{ this.state.going }</span> Going</button>
          <p>{this.props.snippet_text}</p>
        </div>
      </li>
    )
  }

}

export default ListItemComponent;
