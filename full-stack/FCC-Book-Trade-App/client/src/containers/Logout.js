import React from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

import {connect} from 'react-redux';
import {userLogout} from '../actions/index.js';

import Loader from 'halogen/PulseLoader';


class LogoutContainer extends React.Component  {

  constructor (props) {
    super(props);

    this.state ={
      logoutPending: false,
      logoutSuccess: false
    }

    this.clearLogout =  this.clearLogout.bind(this);
    this.handleLogout =  this.handleLogout.bind(this);

  }

  componentDidMount () {
    let self = this;
    this.setState({
      logoutPending: true
    });

    setTimeout(function () {
      self.handleLogout();
    }, 1000);
  }


  clearLogout () {
    this.setState({
      logoutPending: false,
      logoutSuccess: false
    })
  }


  handleLogout () {
    let self = this;
    this.props.dispatch(userLogout());

    axios.post('/logout')
      .then(function (res) {
        console.log(res, "this is logout");
        // Force the spinner to run for 3 seconds before redirecting
        setTimeout(function () {
          self.setState({
            logoutSuccess: true
          })
        }, 2000);

      }).catch(function (err) {
        console.log(err, "this is err on logout")
      })
  }

  render () {

    if (this.state.logoutPending && this.state.logoutSuccess) {
      return <Redirect to={{
        pathname: "/",
        state: {logout: true}
        }} />
    }

    return (
      <div className="loader-container">
        <Loader color="#26A65B" size="16px" margin="4px" />
        <div>
          <p>Please wait, logging out</p>
        </div>
      </div>
    )
  }

}

let Logout = connect()(LogoutContainer);


export default Logout;
