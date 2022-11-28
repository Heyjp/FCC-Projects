import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => (
  <div className="navigation">
    <ul className="nav-bar">
      {props.tabs.map(function (e, i) {
        let activeClass = e === props.active ? "active" : "";
        // Conditonally render out depending on user login status
        if (props.user === false && (e === "/profile" || e === "/dashboard" || e === "/logout") ) {
          return;
        }
        if (props.user && (e === "/login" || e === "/signup")) {
          return;
        }
        return (<li className={`nav-item ${activeClass}`} key={i} onClick={props.handleClick.bind(this, e)}>
                  <Link to={`${e}`}>
                    <img src={`/images/${props.icons[i]}`} width="20px" height="20px"/>
                  </Link>
                </li>
               )
      })
    }
    </ul>
  </div>
)

export default Nav;
