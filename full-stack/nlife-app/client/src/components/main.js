import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Login from  './login.js';
import Title from './title.js';
import SearchForm from './search.js';
import Address from './address.js';
import Attendance from './attendance.js';


class DataContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queryServer = this.queryServer.bind(this);
  }

  componentWillReceiveProps(props) {
    let self = this;
    if (props.query.length > 0) {
      this.queryServer(props.query);
    }
  }

  state = {
    savedQuery: this.props.query,
    query: "",
    locations: []
  }

  queryServer (location) {
    let self = this;

    axios.post('/search', {
      city: location
    }).then(function (res) {
      self.setState({
        locations: []
      }, function () {
        self.setState({
          query: location,
          locations: res.data.businesses
        })
      })
    }).catch(function (err) {
    })
  }


  render () {
    return (
      <div className="data-container">
        <Title />
        <Route exact path="/" render={() => (
          <div className="search-wrapper">
            <SearchForm loc={this.props.loc} search={this.queryServer} />

            {
              this.state.locations.length > 0 ? (
                <div className="location-display">
                  <p>Results for {this.state.savedQuery || this.state.query}</p>
                </div>
              ) : (
                ""
              )
            }

            {
              this.state.locations.length > 0 ? (
                <ListContainer LoggedIn={this.props.LoggedIn} locations={this.state.locations} />
              ) : (
                ""
              )
            }
          </div>
        )} />
        <Route path="/login" Login={this.props.handleAuth} LoggedIn={this.props.LoggedIn} render={(props) => (
              <Login route="login" Login={this.props.handleAuth} LoggedIn={this.props.LoggedIn} {...props} />
          )} />
        <Route path="/signup" Login={this.props.handleAuth} LoggedIn={this.props.LoggedIn} render={(props) => (
              <Login route="signup" Login={this.props.handleAuth} LoggedIn={this.props.LoggedIn} {...props} />
          )} />
      </div>
    )
  }
}




class ListContainer extends React.Component {

  render () {
    let locations;

    if (this.props.locations.length > 0) {
         locations  = this.props.locations.map( (e,i) => {
          return([
              <div key={i}>
                <div className="location">
                  <Address
                  name={e.name}
                  address={e.address}
                  type={e.type}
                  rating={e.number}
                    />
                  <Attendance isLoggedIn={this.props.LoggedIn} data={e} />
                </div>
                <hr/>
              </div>
          ])
      } )
    }

    return (
    <div className="list-container">
        <div className="location-container">
            {locations}
        </div>
      </div>
    )
  }
}





export default DataContainer
