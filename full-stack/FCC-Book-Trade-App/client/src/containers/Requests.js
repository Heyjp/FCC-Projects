import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';

import {setReqModal} from "../actions/login.js";
import {setModal, cancelTradeRequest, acceptTradeRequest} from '../actions/index.js'

import {RequestTab} from '../components/Profile.js'
import Modal from '../components/Modal.js'

import NotificationSystem from 'react-notification-system';


class RequestContainer extends React.Component {

  constructor(props) {
    super(props);

    this.handleReq = this.handleReq.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectRequests = this.rejectRequests.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);

    this.state = {
      isOpen: false
    }
  }

  acceptRequest (data) {
    this.props.dispatch(acceptTradeRequest(data));
  }

  // Make requests, accept and reject incoming requests
  // Cancel outgoing requests
  handleReq (option, e) {
    e.stopPropagation();
    let self = this;
    let data = this.props.modal
    let user = this.props.user

    option === "accept" ? axios.post(`/api/accept-trade?user=${user}`, data)
      .then(function (res) {
        self.acceptRequest(data);
        self.refs.notificationSystem.addNotification({
          message: "Trade has been accepted",
          level: "success"
        })
      })
    :
      axios.post(`/api/cancel-trade?user=${user}`, data)
        .then(function (res) {
          self.rejectRequests(data)
          self.refs.notificationSystem.addNotification({
            message: "Trade has been cancelled",
            level: "success"
          })
        })
  }

  rejectRequests (book) {
    this.props.dispatch(cancelTradeRequest(book))
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
    this.props.dispatch(setReqModal(modal))
    this.toggleModal();
  }

  render () {
    let isActive = this.state.isOpen
    let acceptOrCancel;
    if (this.props.modal) {
     acceptOrCancel = this.props.modal.owner === this.props.user ? "owner" : "request";
   } else {
     acceptOrCancel = false;
   }

    return (
      <div>
        <RequestTab
          books={this.props.books}
          handleClick={this.handleClick}
        />
          {isActive && <Modal
                        modal={this.props.modal}
                        closeModal={this.toggleModal}
                        handleClick={this.handleReq}
                        owner={acceptOrCancel}
                         /> }
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    modal: state.loginReducer.requestModal
  }
}

let Container = connect(mapStateToProps)(RequestContainer)



export default Container;
