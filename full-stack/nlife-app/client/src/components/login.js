import React from 'react'

import {Redirect} from 'react-router-dom'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: "",
    route: this.props.route
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

  handleSubmit () {
    this.props.Login({
      username: this.state.username,
      password: this.state.password,
      route: this.state.route
    });
  }

  render () {

    if (this.props.LoggedIn) {
      return (
        <Redirect to={{pathname: '/'}} />
      )
    }

    return (
        <Form
        title={this.state.route}
        userInput={this.handleChange}
        passInput={this.handlePass}
        submit={this.handleSubmit}
        user={this.state.user}
        pass={this.state.pass}
         />
    )
  }
}

const Form = (props) => (
  <div className="log-box">
    <form id="sign-up-form">
      <fieldset>
        <h4>{props.title}</h4>
        <input type="text" placeholder="Username" value={props.user} onChange={props.userInput}/><br/>
        <input type="password" placeholder="Password" value={props.pass} onChange={props.passInput}/><br/>
        <input className="action-button" type="button" value="Login" onClick={props.submit}/>
      </fieldset>
    </form>
  </div>
);

Form.propTypes = {
  title: React.PropTypes.string,
  user: React.PropTypes.string,
  pass: React.PropTypes.string,
  userInput: React.PropTypes.func,
  passInput: React.PropTypes.func,
  submit: React.PropTypes.func
}


export default LoginContainer
