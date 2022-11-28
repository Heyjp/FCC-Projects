import React from 'react';
import axios from 'axios';

import BooksList from './Book.js'


export const OptionBar = (props) => (
  <div>
    <ul className="profile-nav">
      {props.tabs.map(function (e, i) {
        let active = props.active === e ? "active-option" : "";
        if (e === "Requests" && props.active === e) {
          return (
                  <li id="request-tab" className={`dashboard-tabs ${active}`}onClick={props.handleClick.bind(this, i)} key={i}>
                    <h3>{e}</h3>
                    <div className="counters">
                      <a href="#" className="request-buttons">{`Inc: ${props.requests.inc.length}`}</a>
                      <a href="#" className="request-buttons">{`Out: ${props.requests.out.length}`}</a>
                    </div>
                  </li>
                  )
        }
        return <li className={`dashboard-tabs ${active}`}onClick={props.handleClick.bind(this, i)} key={i}><h2>{e}</h2></li>;
      })}
    </ul>
  </div>
)

export const AddBooks = (props) => (
  <div className="addbook-form-container">
    <h2 className="addbook-header">Add Books</h2>
    <div className="addbook-form">
      <input type="text" placeholder="Book Title" value={props.title} onChange={props.updateTitle}/>
      <input type="text" placeholder="Author" value={props.author} onChange={props.updateAuthor}/>
      <button onClick={props.submitBook}>Submit</button>
    </div>
  </div>
)

export const RequestTab = (props) => (
    <div className="request-container" id="style-9">
      <h2>Requests</h2>
        {props.books.inc.length >= 1 && <div>
          <h6>Incoming Trade Requests</h6>
          <BooksList
            books={props.books.inc}
            key={1}
            handleClick={props.handleClick}
          />
         </div>
       }
        {props.books.out.length >= 1 && <div>
                                          <h6>Your Requested Trades</h6>
                                          <BooksList
                                            books={props.books.out}
                                            key={2}
                                            handleClick={props.handleClick}
                                            />
                                        </div>
        }
    </div>
  )
