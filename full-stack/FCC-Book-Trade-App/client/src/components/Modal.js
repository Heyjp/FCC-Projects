import React from 'react';
import {Link} from 'react-router-dom'


const Modal = (props) => {
  console.log(props, "this is props on Modal");
  let self = this;
  return (
  <div className="modal" onClick={props.closeModal.bind(this)}>
    <div className="inner-box">
      <div className="modal-top">
        <h4>{props.modal.title}</h4>
        <div className="modal-block-container">
          <div className="owner-block">
            <h5>Current Owner:</h5>
            {props.modal.owner && <Link to={`/user/${props.modal.owner}`}>{props.modal.owner}</Link>}
            <p>{props.modal.user}</p>
          </div>
          <div className="image-block">
            <img src={props.modal.image} width="100px" height="150px" />
          </div>
        </div>
      </div>
      <div className="modal-bot">
        <ul className="list-container">
          {!props.owner && !props.user && !props.modal.user && <li className="modal-signin"><Link id="button-one" to="/login">Login</Link><Link id="button-two" to="/signup">Signup</Link></li>}
          {props.user && props.reqBook && <li className="modal-signin"><a id="button-three"onClick={props.reqBook.bind(this, props.modal)}>Request Book</a></li>}
          {props.owner === "owner" && props.handleClick && <li className="modal-signin"><a id="button-four"onClick={props.handleClick.bind(this, "accept")}>Accept Request</a></li>}
          {props.owner === "request" && props.handleClick && <li className="modal-signin"><a id="button-five"onClick={props.handleClick.bind(this, "cancel")}>Cancel Request</a></li>}
          {!props.cancelBook && props.addBook && <li className="modal-signin"><a id="button-three" onClick={props.handleClick.bind(this, "add")}>Add Book To Collection</a></li>}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Modal;


// onClick={props.reqBook.bind(this, props.modal)}

// Dynamic Javascript Object Keys

// [key] : value
// [`${uid}_number`] : value
