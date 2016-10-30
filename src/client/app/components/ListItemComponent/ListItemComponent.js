import React, { Component } from 'react';
import styles from './styles';

class ListItemComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      going: 0,
      isBooked: false,
      token: localStorage.token,
      error: null,
      user: localStorage.user || ''
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
    let user = JSON.parse(this.state.user);
    let userId = user._id;
    let bookings = this.props.bookings;
    let company  = bookings.filter((booking) => {
      return booking.company == this.props.name;
    });
    if(company.length == 0) {
      return;
    } else {
      if(company[0].attendees.indexOf(userId) != -1) {
        this.toggleBooking();
      }
      this.setState({going: company[0].attendees.length});
    }
  }

  makeABooking() {
    let user = JSON.parse(this.state.user);
    let userId = user._id;
    const url = this.props.url;
    axios.post(url + 'users/' + userId + '/bookings',
    { company: this.props.name },
    { headers: {'token': this.state.token || localStorage.token }})
    .then((data) => {
      console.log(data.data.message);
      console.log(this.state.token);
      if(data.data.message != 'already attending!') {
        this.setState((prev, props) => {
          return { going: prev.going + 1 };
        });
      }
      this.toggleBooking();
    })
    .catch((err) => {
      console.log(err);
      if(!this.state.token) {
        this.setState({ error: 'You must login!'});
      }
    })
  }

  unDoABooking() {
    let user = JSON.parse(this.state.user);
    let userId = user._id;
    const url = this.props.url;
    axios.delete(url + 'users/' + userId + '/bookings/'
          + this.props.name,
    { headers: {'token': this.state.token || localStorage.token }})
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
      if(!this.state.token) {
        this.setState({ error: 'You must login!'});
      }
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
          <button className="btn btn-primary btn-xs" onClick={ this.state.isBooked ? this.unDoABooking.bind(this) :
                            this.makeABooking.bind(this)  }>
          <span className="badge">{ this.state.going }</span> Going</button>
          <p>{this.props.snippet_text}</p>
        </div>
      </li>
    )
  }

}

export default ListItemComponent;
