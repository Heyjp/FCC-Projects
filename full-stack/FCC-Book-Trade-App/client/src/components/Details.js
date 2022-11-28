import React from 'react'

const Details = (props) => {
  return (
  <div className="profile-wrapper">
        <ul>
          {props.fields.map(function (e, i) {
            let style;
            props.active === i ? style = {display: "inherit"} : style = {display: "none"};
            return (
              <li key={i}>
                <div className="profile-section">
                  <h4>{e}</h4>
                  {props.userProfile[e].length > 1 ? <p>{props.userProfile[e]}</p> : <p>{`Please Enter in your ${e}`}</p>}
                  <button className="flat-button" onClick={props.handleClick.bind(this, i)}>Edit</button>
                  <div className="edit-section" style={style}>
                    <input type="text" placeholder={e} value={props.inputValues[e]} onChange={props.handleChange.bind(this, e)}/>
                    <button className="submit-button" onClick={props.handleSubmit.bind(this, e)}>Submit Change </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
    </div>
)}

export default Details;
