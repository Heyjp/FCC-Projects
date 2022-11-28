var React = require('react');
var ReactDOM = require('react-dom');
var Axios = require('axios')

var TableContainer = React.createClass({
  getInitialState: function () {
      return {data: []}
  },
  getDataOnClick: function (url) {

    Axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/' + url)
    .then(function (response) {

      if (url === "recent") {
       var sortedTable = response.data.sort(function(a, b) {
        return b.recent - a.recent;
      });
    }
      else {
        var sortedTable = response.data.sort(function(a, b) {
         return b.alltime - a.alltime;
       });
      }
      this.setState({
        data: sortedTable
      })

    }.bind(this));
  },
    componentDidMount: function () {
      this.getDataOnClick("recent");
  },
  render: function () {
    return (
    <div>
      <ReactTable data={this.state.data} allTime={this.getDataOnClick.bind(null, "alltime")} buttonClick={this.getDataOnClick.bind(null, "recent")}/>
    </div>
    )
  }
});

var ReactTable = React.createClass({
  render: function () {
    var tableData = this.props.data.map(function (data, index) {
      return (
        <tr>
          <th>{index + 1}</th>
          <th><img src={data.img}/>{data.username}</th>
          <th>{data.recent}</th>
          <th>{data.alltime}</th>
        </tr>
      )
    });
    return (
      <div>
        <table>
          <thead>
            <tr >
              <th data-field="id">#</th>
              <th data-field="name">Camper Name</th>
              <th data-field="30 days" onClick={this.props.buttonClick}>Last 30 days</th>
              <th data-field="all time" onClick={this.props.allTime}>All time</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    )
  }
});





ReactDOM.render(
  <TableContainer apiData=""/>,
  document.getElementById('root')
);
