var React = require('react');
var ReactDOM = require('react-dom');

var CellCheck = require('./Components/Board.js');

var timer;
var runner;

function compareArrays (array1, array2) {

  if (array1.length !== array2.length) {
    return false;
  }

  for (var i = 0; i < array1.length; i++) {
    if (array2.indexOf(array1[i]) === -1) {
      return false;
    }
  }
  return true;

}

var Container = React.createClass({
  render: function () {
    return (
      <Board />
    )
  }
});

var Board = React.createClass({
 getInitialState: function () {
   return {
     Tiles: [1, 2, 3, 4],
     timer: false,
     currentCount: 0,
     runs: false
   }
 }, checkTiles: function () {
     var newRuns = this.state.currentCount + 1;
     var Tiles = this.state.Tiles;
     var newState = CellCheck(Tiles);

     if (compareArrays(Tiles, newState) === true) {
       clearInterval(this.state.timer);
       return this.setState({
         runs: false,
         timer: undefined
       })
     } else {
       return this.setState({
         Tiles: newState,
         currentCount: newRuns
       });
     }
 }, timer: function () {
   if (this.state.runs === false) {
      this.setState({
        timer: setInterval(this.checkTiles, 400),
        runs: true
      })
   } else {
     clearInterval(this.state.timer);
     this.setState({
       timer: undefined,
       runs: false
     })
   }
 }, reset: function () {
   clearInterval(this.state.timer);
   this.setState({
     runs: false,
     timer: undefined,
     currentCount: 0,
     Tiles: []
   })
 },
  handleClick: function (index) {

  var tiles = this.state.Tiles;
  if (tiles.indexOf(index) !== -1) {
    var ele = tiles.indexOf(index);
    tiles.splice(ele, 1);
  } else {
    tiles.push(parseInt(index));
  }
    this.setState({
      Tiles: tiles
    })
  },
  render: function () {
    var size = 10 * 10;
    var Tiles = []
      for (var i = 0; i < size; i++) {
        Tiles.push(i); //
      }
      var TileBoard = Tiles.map(function (ele, idx) {
      var is_selected = this.state.Tiles.indexOf(idx) !== -1;

      return <Tile className="tile" onClick={this.handleClick.bind(this, idx)} isSelected={is_selected} key={idx}></Tile>
    }.bind(this));

    var btnText = this.state.runs === false ? "Start Board" : "Stop Board";

    const style = {
      backgroundColor: this.state.runs ? "#CF000F" :"#006442",
      color: "white"
    }

    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-mg-12 col-sm-12 generations">
            <h4>Num of Generations</h4>
            <p className="text-center">{this.state.currentCount}</p>
          </div>
        </div>
        <div id="box">
        {TileBoard}
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 btn-container">
            <a href="#" style={style} className="btn btn-default" onClick={this.timer}>{btnText}</a>
            <a href="#" className="btn btn-default" onClick={this.reset}>Reset Board</a>
          </div>
        </div>
      </div>
    )
  }
});

var Tile = React.createClass({
  getDefaultProps: function() {
        return {
            isSelected: false
        }
    },
  render: function () {
    var liStyle = {
            background: '#eee'
        };
        if (this.props.isSelected) {
            liStyle['background'] = '#ff7f7f';
        }
    return (
      <div className="tile" style={liStyle} onClick={this.props.onClick}>
      </div>
    )
  }
})

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);
