import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Form from '../components/Form.js';
import {setUser} from '../actions/login.js';
import axios from 'axios';

import NotificationSystem from 'react-notification-system';


class AuthContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      route: props.location.pathname,
      user: props.user
    }

    this.route = props.location.pathname

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.promiseCall = this.promiseCall.bind(this)
    this.handlePromiseError = this.handlePromiseError.bind(this);
  }

  componentWillReceiveProps (props) {
    console.log("new props", props)
  }

  handlePromiseError (err) {
    console.log(err, "this is handlePromiseError")

    if (err.user === false) {
      return this.refs.notificationSystem.addNotification({
        message: "Error Login name not found.",
        level: 'error',
        position: 'tc'
      })
    }

    if (err.user === "found") {
      return this.refs.notificationSystem.addNotification({
        message: "User already exists, choose another Username.",
        level: 'error',
        position: 'tc'
      })
    }

    if (err.err) {
      return this.refs.notificationSystem.addNotification({
        message: "Error found on the server. Please try again in a minute.",
        level: 'warning',
        position: 'tc'
      })
    }

  }

  handleUser (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePass (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    let {username, password, route} = this.state;
    // Route is taken from  the route props and contains "/", slice to remove it.
    route = route.slice(1, route.length)
    this.promiseCall(username, password, route)
    this.setState({
      username: '',
      password: ''
    })
  }

  promiseCall (username, password, route) {
    let self = this;
    axios.post(`/api/${route}`, {username, password}).then(function (res) {
      if (res.data.err || !res.data.user || res.data.user === "found") {
      return self.handlePromiseError(res.data);
      }
      self.props.dispatch(setUser(res.data.user))
    }).catch(function (err) {
      console.error(err, "err")
    })
  }


  render () {

    let route;

    this.state.route === "/login" ? route = "Login" : route = "Sign Up";
    // If user is logged in redirect from page
    if (this.props.user !== false) {
      return (
        <Redirect to={{
          pathname: '/',
          state: {loggedIn: 'I came from Auth', route}
        }} />
      )
    }

    return (
      <div>
        <Form
        route={route}
        pass={this.handlePass}
        user={this.handleUser}
        submit={this.handleSubmit}
        username={this.state.username}
        password={this.state.password}
         />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    loginError: state.loginReducer.loginError,
    user: state.loginReducer.user
  };
}

export default connect(mapStateToProps)(AuthContainer);
