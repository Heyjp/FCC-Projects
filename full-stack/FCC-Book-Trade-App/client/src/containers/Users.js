import React from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import BooksList from '../components/Book.js'

import {setUserLibrary} from '../actions/login.js'

class UserContainer extends React.Component {
  constructor (props) {
    super(props);

    this.setCollection = this.setCollection.bind(this);

    this.setCollection();
  }

  componentWillReceiveProps(nextProps) {
    // Force the component to rerender if changing URL
    this.setCollection();
  }

  setCollection () {
    console.log("setting collection");
    let self = this;
    let user = this.props.match.params.userId;
    axios.get(`/api/show-library?user=${user}`)
      .then(function (res) {
        self.props.dispatch(setUserLibrary(res.data))
      }).catch(function (err) {
        console.log(err, "this is err");
      })
  }

  render () {
    console.log(this.props, "props")
    return (
      <div>
        <h3>{this.props.match.params.userId}</h3>
        <BooksList books={this.props.userCollection} />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userCollection: state.loginReducer.userLibrary
  }
}


let UserConnect = connect(mapStateToProps)(UserContainer)

export default UserConnect;
