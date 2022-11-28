import React from 'react';

/*
class Address extends React.Component {

  state = {
    name: this.props.data.name,
    address: [this.props.data.location.address[0], ", ", this.props.data.location.city],
    type: this.props.data.categories.map((ele) => ele[0] + ", "),
    rating: this.props.data.rating
  }


  render () {
    return (
      <div className="address">
        <ul>
          <li><h1>{this.state.name}</h1></li>
          <li>{this.state.address}</li>
          <li>{this.state.type}</li>
          <li>{this.state.rating}*</li>
        </ul>
      </div>
    )
  }
}
*/

const AddressList = (props) => (
  <div className="address">
    <ul>
      <li><h1>{props.name}</h1></li>
      <li>{props.address}</li>
      <li>{props.type}</li>
      <li>{props.rating}*</li>
    </ul>
  </div>
)

AddressList.propTypes ={
  name: React.PropTypes.string.isRequired,
  address: React.PropTypes.array.isRequired,
  type: React.PropTypes.array.isRequired,
  rating: React.PropTypes.number.isRequired
}

export default AddressList
