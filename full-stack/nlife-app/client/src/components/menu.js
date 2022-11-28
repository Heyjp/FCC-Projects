import React from 'react'
import {Link, Redirect} from 'react-router-dom'

class MenuContainer extends React.Component {

    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    state = {
      loggedIn: false
    }

    componentWillReceiveProps (props) {
      this.setState({
        loggedIn: props.isLoggedIn
      })
    }

    handleClick (e) {
      let self = this;
      e.preventDefault();
      axios.post('/logout').then(function (res) {
        self.props.logout();
      });
    }

    render () {
      let loginStatus = this.state.loggedIn ? (
          <ul>
            <li className="btn"><a href='#' onClick={this.handleClick}>Logout</a></li>
          </ul>
        ) : (
          <ul>
            <li className="btn"><Link to="/login">Login</Link></li>
            <li className="btn"><Link to="/signup">Create Account</Link></li>
          </ul>
      )

    let loginNotice = this.state.loggedIn ? (
        <div className="login-menu">
          <p>Logged in as {this.props.user}</p>
        </div>
      ) : (
        ""
      )
    return (
    <div className="menu-container">
      <div className="menu">
        {loginStatus}
      </div>
        {loginNotice}
    </div>
    )
  }
}

export default MenuContainer
