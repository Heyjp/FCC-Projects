var React = require('react');
var ReactDOM = require('react-dom');
var Remarkable = require('remarkable');

var md = new Remarkable({
  typographer: true
});

var textVar ="# Remarkable \n\n> Experience real-time editing with Remarkable! \n\n Click the `clear` link to start with a clean slate, or get the `permalink` to share or save your results. \n\n *** \n\n # h1 Heading \n ## h2 Heading \n ### h3 Heading \n #### h4 Heading \n ##### h5 Heading \n ###### h6 Heading \n\n\n ## Horizontal Rules \n\n___ \n\n *** \n\n *** \n\n**This is bold text** \n\n__This is bold text__ \n\n*This is italic text* \n\n_This is italic text_ \n\n~~Deleted text~~"

var InputArea = React.createClass({

  render: function () {
    return (
      <div className="col s6" >
        <textarea onChange={this.props.onChange}>
          {textVar}
        </textarea>
      </div>
    )
  }
});

var TheOutput = React.createClass({
  renderMarkup: function () {
    var rawMarkup = md.render(this.props.value.toString());
    return {__html: rawMarkup}
  },
  render: function () {
    return (
      <div className="col s6" id="outputBox" value={this.props.value} dangerouslySetInnerHTML={this.renderMarkup()}>
      </div>
    )
  }
});

var DisplayContainer = React.createClass({
  getInitialState: function () {
    return ({
      value: textVar
    })
  },
  handleUpdate: function (e) {
    this.setState({
      value: e.target.value
    })
  },
  render: function () {
    return (
      <div className="col s12 box">
        <InputArea onChange={this.handleUpdate}/>
        <TheOutput value={this.state.value}/>
      </div>
    )
  }
});

ReactDOM.render(
  <DisplayContainer />,
  document.getElementById('app')
)
