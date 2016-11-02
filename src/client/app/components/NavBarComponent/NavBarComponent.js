import React, { Component } from 'react';
import styles from './styles';

class NavBarComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      error: null,
      token: '',
      user:  ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handelelogOut = this.handelelogOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      token: localStorage.token || '',
      user:  localStorage.user  || ''
    });
  }

  renderError() {
    if(!this.state.error) { return null;}

    window.setTimeout(() => {
      this.setState({ error: null});
    }, 2000)

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

  renderNavBarState() {

    if(this.state.token) {
      let user = JSON.parse(this.state.user)
      console.log(user);
      return <form className="navbar-form navbar-right" role="search">
                <div style={{color: 'white'}} className="form-group">
                  Welcome, { user.name }
                </div>
                <a onClick={ this.handelelogOut } href="/" className="btn btn-link">Logout</a>
              </form>
    } else {
      return <form onSubmit={ this.handleLogin }className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input style={styles.input} type="text" className="form-control"
                         placeholder="Username" onChange={this.handleUsernameChange} />
                  <input style={styles.input} type="password" className="form-control"
                         placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
              </form>
    }
  }

  _logIn(username, password) {
    let token, user;
    const url = this.props.url;
    axios.get(url + 'login', {
      auth: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      token = response.data.token;
      user  = JSON.stringify(response.data.data);
      if(response.data.status == 'failure') {
        localStorage.removeItem('token');
        this.setState({ error: response.data.message })
      } else {
        localStorage.token = token;
        localStorage.user  = user;
        console.log(typeof user);
        this.setState({ token, user, error: null });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handelelogOut(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    this.setState({ token: '' });
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
                { this.renderNavBarState() }
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
