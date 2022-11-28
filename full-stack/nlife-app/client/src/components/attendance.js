import React from 'react';

class Attendance extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    attendance: this.props.data.guestListLength,
    id: this.props.data.id,
    city: this.props.data.location.city,
    isLoggedIn: false
  }

  reqAttend (e) {
    let self = this;
    axios.post('/check', {
      id: e.id,
      city: e.city
    }).then(function (res) {
      self.setState({
        attendance: res.data.guestList
      })
    })
  }

  handleClick () {

    let data = {
      id: this.state.id,
      city: this.state.city
    };
    this.reqAttend(data);
  }

  render () {
    return (
      <AttendanceRender func={this.handleClick} attendance={this.state.attendance} />
    )
  }
}

/*
<div className="attendance">
  <h6>Attending</h6>
  <a className="loc-btn" href="#" onClick={this.handleClick}>{this.state.attendance}</a>
</div>
*/

const AttendanceRender = (props) => (
  <div className="attendance">
    <h6>Attending</h6>
    <a className="loc-btn" href="#" onClick={props.func}>{props.attendance}</a>
  </div>
)

AttendanceRender.propTypes = {
  func: React.PropTypes.func.isRequired,
  attendance: React.PropTypes.number.isRequired
}

export default Attendance;
