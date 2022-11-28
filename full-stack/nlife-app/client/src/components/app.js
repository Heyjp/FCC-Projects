import React from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'

import Menu from './menu.js'
import Main from './main.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    query: "",
    isLoggedIn: false,
    user: ""
  }

  componentWillMount () {
    this.sessionCheck();
    this.queryCheck();
  }

  sessionCheck () {
    let self = this;
    axios.post('/user')
      .then(function (res) {
        if (res.data.user !== false) {
          self.setState({
            user: res.data.user,
            isLoggedIn: true,
          });
        }
      });
  }

  queryCheck () {
    let self = this;
    axios.post('/query')
      .then(function (res) {
        self.setState({
          query: res.data.location
        })
      })
  }

  handleLogin (e) {
    let self = this;
    axios.post(`/${e.route}`, {
      username: e.username,
      password: e.password
    }).then(function (res) {
      self.setState({
        user: res.data,
        isLoggedIn: true
      })
    })
  }

  handleLogout () {
    this.setState({
      isLoggedIn: false,
      user: ""
    })
  }

  render () {

    return (
      <Router>
        <div className="main-container">
          <Menu  user={this.state.user} logout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
          <Main query={this.state.query} LoggedIn={this.state.isLoggedIn} handleAuth={this.handleLogin} />
        </div>
      </Router>
    )
  }
}


export default App;
