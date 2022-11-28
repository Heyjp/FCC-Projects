import React from 'react';

const Form = (props) => {
  return (
    <div className="form-container">
      <h2>{props.route}</h2>
        <form onSubmit={props.submit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" value={props.username} onChange={props.user}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={props.password} onChange={props.pass}/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    </div>
  )
}

export default Form;
