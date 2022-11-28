import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    location: ""
  }

  handleChange (e) {
    this.setState({
      location: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.search(this.state.location)
  }

  render () {

    return (
      <Form submit={this.handleSubmit} enterLocation={this.handleChange} location={this.state.location} />
    )
  }
}

const Form = (props) => (
  <div className="form" >
    <form id="search" onSubmit={props.submit}>
      <input type="text" name="" value={props.location} placeholder="Enter a city" onChange={props.enterLocation}/>
      <input className="hidden" type="submit"  />
    </form>
  </div>
)

Form.propTypes = {
  submit: React.PropTypes.func,
  value: React.PropTypes.string,
  enterLocation: React.PropTypes.func
}

export default SearchForm
