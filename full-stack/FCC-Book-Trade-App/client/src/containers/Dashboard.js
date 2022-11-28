import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

// CONTAINERS
import RequestContainer from './Requests.js'

// ACTIONS
import {setUserLibrary, addBookToLibrary} from '../actions/login.js'
import {setModal, setRequests} from '../actions/index.js'

// COMPONENTS
import {CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js';
import BooksList from '../components/Book.js';
import Modal from '../components/Modal.js';

import NotificationSystem from 'react-notification-system';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tabs: ['Current', 'Requests', 'Add'],
      title: '',
      author: '',
      userLibrary: [],
      requestedBook: [],
      requests: [],
      user: props.user,
      isOpen: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.getRequests = this.getRequests.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUserLibrary = this.setUserLibrary.bind(this);
    this.handleBooks = this.handleBooks.bind(this);
    this.addBookToCollection = this.addBookToCollection.bind(this);
    this.bookAddNotification = this.bookAddNotification.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount () {
    this.setUserLibrary();
    this.getRequests();
  }


  addBookToCollection (object, e) {
    e.stopPropagation();
    let self = this;

    axios.post('/api/add-book', self.props.modal)
      .then(function (res) {
        self.bookAddNotification();
        self.props.dispatch(addBookToLibrary(self.props.modal));
        self.toggleModal();
      });
  }

  bookAddNotification (type) {
    return this.refs.notificationSystem.addNotification({
       message: "Book successfully Added",
       level: 'success',
       position: 'tc'
     })
  }


  getRequests () {
    let self = this;
    axios.get(`/api/get-trades?user=${this.state.user}`)
      .then(function (res) {
        console.log("getting Requests on Dashboard", res.data);
        self.props.dispatch(setRequests(res.data));
      })
  }


  handleBooks (e, i) {
    let data = e;
    data.user = this.state.user;
    this.props.dispatch(setModal(data))
    this.toggleModal();
  }

  handleClick (i) {
    let result = this.state.tabs[i];
    this.setState({
      active: result
    })
  }

  updateTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  updateAuthor (e) {
    this.setState({
      author: e.target.value
    })
  }

  setUserLibrary () {
    let self = this;
    let user = this.state.user;
    axios.get(`/api/show-library?user=${user}`)
      .then(function (res) {
        self.props.dispatch(setUserLibrary(res.data))
      }).catch(function (err) {
        console.log(err, "this is err");
      })
  }

  handleSubmit () {
    let self = this;
    const {title, author} = this.state;
    axios.post('/api/book-search', {title, author})
    .then(function (res) {
      self.setState({
        searchResults: res.data
      });
    })

    this.setState({
      title: '',
      author: ''
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

  render() {

    if (!this.state.user) {
      return (
        <Redirect to="/" />
      )
    }

    let activeComponent;

    if (!this.state.active) {
      activeComponent = <BooksList books={this.props.userLibrary}  />
    } else if (this.state.active === "Current") {
      activeComponent = <BooksList books={this.props.userLibrary}  />
    } else if (this.state.active === "Requests") {
      activeComponent = (
      <div>
        <RequestContainer books={this.props.requests} handleClick={this.handleBooks}/>
      </div>
      )
    } else if (this.state.active === "Add") {
      activeComponent =  (
        <div className="addbooks-container">
          <AddBooks
           title={this.state.title}
           author={this.state.author}
           updateTitle={this.updateTitle}
           updateAuthor={this.updateAuthor}
           submitBook={this.handleSubmit}
           />
          {this.state.searchResults && <BooksList books={this.state.searchResults} handleClick={this.handleBooks} />}
          {
            this.state.isOpen ? <Modal modal={this.props.modal} addBook={true} handleClick={this.addBookToCollection} closeModal={this.toggleModal}/> : ""
          }
        </div>
      )
    } else {
      activeComponent = <BookList books={this.props.userLibrary} />
    }

      return (
        <div className="dashboard-container">
          <NotificationSystem ref="notificationSystem" />
          <div>
              <OptionBar tabs={this.state.tabs} requests={this.props.requests} active={this.state.active} handleClick={this.handleClick} />
              {activeComponent}
          </div>
        </div>
      )
    }

}

const mapStateToProps = (state) => {
  console.log("mapState TO Props, dashboard, requests", state.bookApp.requests)
  return {
    books: state.collection,
    modal: state.bookApp.modal,
    requests: state.bookApp.requests,
    user: state.loginReducer.user,
    userLibrary: state.loginReducer.userLibrary
  }
}

let dashBoard = connect(mapStateToProps)(DashBoard);

export default dashBoard;
