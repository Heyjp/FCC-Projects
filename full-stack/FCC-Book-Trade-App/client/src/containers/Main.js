import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import BooksList from '../components/Book.js'
import Modal from '../components/Modal.js'

import {setLibrary, setModal} from '../actions/index.js'

import NotificationSystem from 'react-notification-system';

class Main extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      books: [],
      isOpen: false,
      modal: false,
      loggedIn: false,
      loggedOut: null
    }


    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.requestBook = this.requestBook.bind(this);
    this.reqNotification = this.reqNotification.bind(this);
  }


  componentWillMount () {
    this.getBooks();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "this is nextPorps on Main");

    this.setState({
      books: nextProps.books,
      modal: nextProps.modal
    })

    // Flag so alert does not repeat after login
      if (nextProps.location.state && nextProps.location.state.loggedIn && !this.state.loggedIn) {
        this.setState({
          loggedIn: true
      })
      // Alerts depending on login or signup
        return this.refs.notificationSystem.addNotification({
           message: `${nextProps.location.state.route} Successful`,
           level: 'success',
           position: 'tc'
        })
      }

      if (nextProps.location.state && nextProps.location.state.logout && !this.state.loggedOut) {
        this.setState({
          loggedOut: true
      })
      // Alerts depending on login or signup
        return this.refs.notificationSystem.addNotification({
           message: `Logout Successful`,
           level: 'success',
           position: 'tc'
        })
      }
  }

  reqNotification () {
    return this.refs.notificationSystem.addNotification({
       message: "Book successfully requested",
       level: 'success',
       position: 'tc'
     })
  }

  getBooks () {
    let self = this;
    console.log(this.props.dispatch, "dispatch")
    axios.get('/api/books')
      .then(function (res) {
        self.props.dispatch(setLibrary(res.data))
      }, function (err) {
        console.log(err, "this is err on get book")
      }).catch(function (err) {
        console.log(err, "this is err");
      })
  }

  toggleModal (e) {
    this.state.isOpen ? this.setState({
      isOpen: false
    }) :
    this.setState({
      isOpen: true
    })
  }

  handleClick (modal) {
    this.props.dispatch(setModal(modal))
    this.toggleModal();
  }

  requestBook (object, e) {
    e.stopPropagation();
    let self = this;
    let userData = object;
    userData.user = this.props.user;
    axios.post('/api/request-book', userData)
      .then(function (res) {
        console.log(res, "this is res on requestBook")
        self.reqNotification();
      }, function (err) {
        console.log(err, "this is err on get book")
      })
  }

  render () {

    return (
      <div className="main-container" id="style-9">
        <BooksList books={this.state.books} handleClick={this.handleClick} />
        {
          this.state.isOpen ? <Modal modal={this.props.modal} user={this.props.user}reqBook={this.requestBook} closeModal={this.toggleModal}/> : ""
        }
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    books: state.bookApp.books,
    modal: state.bookApp.modal,
    user: state.loginReducer.user
  }
}

let main = connect(mapStateToProps)(Main)

export default main;
