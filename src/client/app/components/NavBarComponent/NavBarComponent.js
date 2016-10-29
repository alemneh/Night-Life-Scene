import React, { Component } from 'react';
import styles from './styles';

class NavBarComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      error: null,
      token: localStorage.token || ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  renderError() {
    if(!this.state.error) { return null;}

    return <div className="alert alert-dismissible alert-danger">
             <button type="button" className="close" data-dismiss="alert">&times;</button>
             {this.state.error}
           </div>
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }

  _logIn(username, password) {
    let token;
    axios.get('http://localhost:3000/login', {
      auth: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      token = response.data.token;
      if(response.data.status == 'failure') {
        localStorage.removeItem('token');
        this.setState({ error: response.data.message })
      } else {
        localStorage.token = token;
        this.setState({ token, error: null });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleLogin(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const validateLoginInput = this.validateLoginInput(username, password);

    if(validateLoginInput) {
      this.setState({ error: validateLoginInput})
      return;
    }

    this._logIn(username, password);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"
                aria-expanded="false" >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Bar Hop</a>
            </div>

            <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-2"
                aria-expanded="false">
              <form onSubmit={ this.handleLogin}className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input style={styles.input} type="text" className="form-control"
                         placeholder="Username" onChange={this.handleUsernameChange} />
                  <input style={styles.input} type="password" className="form-control"
                         placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
              </form>
            </div>
          </div>
        </nav>
        {this.renderError()}
      </div>
    );
  }

  validateLoginInput(username, password) {
    if(!username) {
      return 'Please enter username'
    } else if(!password) {
      return 'Pleas enter password'
    } else {
      return null;
    }
  }
}

export default  NavBarComponent;
