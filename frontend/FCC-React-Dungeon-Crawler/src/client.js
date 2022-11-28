import React from 'react';
import ReactDOM from 'react-dom';

import WorldMap from './map/canvas.js';
import Room from './map/room.js'

import {draw_paths} from './map/room-builder.js';

import Camera from './camera/camera.js';
import Player from './elements/player.js';

import ImageList from './elements/images.js';

import {changeDirection, cancelDirection, clearItems} from './utils/utils.js'



class Map extends React.Component {

  constructor (props) {
    super(props);

    this.initialState =  {
      worldMap: new WorldMap(),
      player: new Player(),
      Images: new ImageList(),
    };

    this.state = this.initialState;

  }

  reset () {
    console.log("game resetting");
    location.reload();
  }

  startGame() {
    console.log("starting the game");
    this.state.Images.loadImages();
    this.state.player.getLocation(this.state.worldMap.rooms)
    this.drawCanvas();
    this.setBackupCanvas();
    this.startGameLoop()
  }


  componentDidMount() {
    this.startGame();
  }

  drawCanvas () {
    const ctx = this.state.worldMap.canvas.getContext('2d');
  //  this.state.worldMap.map.paint(ctx);
    this.state.worldMap.rooms.forEach(function (e) {
      e.paint(ctx);
    });
    draw_paths(ctx, this.state.worldMap.map);
  }

  handleKeyDown (e) {
    changeDirection(e.keyCode, this.state.player);
  }

  handleKeyUp(e)  {
    cancelDirection(e.keyCode, this.state.player);
  }


  setBackupCanvas () {

    let backupCanvas = document.createElement('canvas');
    backupCanvas.width = 2000;
    backupCanvas.height = 2000;

    let backupCtx = backupCanvas.getContext('2d');
    backupCtx.drawImage(this.state.worldMap.canvas, 0, 0);

    this.setState({
      backupWorldMap : backupCanvas
    })
  }

  startGameLoop () {
    var interval = setInterval(() => {
      this.updateMap(this.state.worldMap.canvas.getContext('2d'), this.state.worldMap.objects);
    }, 100);

    this.setState({
      interval
    });
  }

  stopGameLoop () {
    console.log("stopping game loop")
    clearInterval(this.state.interval);

    if (this.state.player.win) {
      alert("Congratulations you have defeated the dragon");
      this.reset();
    } else if (this.state.player.dead){
      alert("You have died so sorry, try again!");
      this.reset();
    }
  }

  updateMap (ctx, gameItems) {
    clearItems(this.state.worldMap.objects)

    this.state.player.update(ctx, gameItems);
    const backupCanvas = this.state.backupWorldMap

    this.state.worldMap.ctx.clearRect(0, 0, 2000, 2000);
    this.state.worldMap.ctx.drawImage(backupCanvas, 0, 0);
    this.state.worldMap.drawObjects(this.state.worldMap.canvas);

    this.setState({...this.state});

    if (this.state.player.win) {
      console.log("player won")
      this.stopGameLoop();
    } else if (this.state.player.dead) {
      console.log("player lose");
      this.stopGameLoop();
    } else {
      console.log("Everythings fine");
    }
  }

  render () {
    return (
      <div key={this.state.key} tabIndex="0" className="game-container" onKeyUp={this.handleKeyUp.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
        <Legend player={this.state.player} enemies={this.state.worldMap.objects}/>
        <Canvas worldMap={this.state.worldMap.canvas} player={this.state.player}  width="750" height="750"  />
      </div>
    );
  }
}

class Legend extends React.Component {
  constructor (props) {
    super(props);

  }

  render () {

        const enemy = this.props.enemies.filter(function (e) {
          return e.lastEnemy;
        });

      return (
      <div>
        <div>
          <h1 className="title">
            RogueLike React<br/> Dungeon Crawler
          </h1>
        </div>
        <div className="stat-block">
          <ul>
            <h4>Player</h4>
            <li>Level: {this.props.player.level}</li>
            <li>Weapon: {this.props.player.weapon}</li>
            <li>Health: {this.props.player.health}</li>
            <li>Experience: {this.props.player.experience}</li>
          </ul>
            {enemy.length > 0 ? (
                <ul>
                  <li>Enemy</li>
                  <li>Health {enemy[0].health}</li>
                  <li>Damage {enemy[0].damage}</li>
                </ul>
                ) : (
                <ul>
                  <li>No Enemy</li>
                </ul>
                )
            }

          <ul>
            <h4>Legend</h4>
            <li>Player  <img src="img/tuxedo.png" alt="" /></li>
            <li>Enemy <img src="img/earth019.png" alt="" /></li>
            <li>Dragon <img src="img/dragon.png" alt="" /></li>
            <li>Weapons Chest <img src="img/chestRed.png" alt="" /></li>
            <li>Full Health Potion <img src="img/pt1.png" alt="" /></li>
            <li>75% Potion <img src="img/pt2.png" alt="" /></li>
            <li>50% Potion <img src="img/pt3.png" alt="" /></li>
            <li>25% potion <img src="img/pt4.png" alt="" /></li>
          </ul>
        </div>
      </div>
    )
  }
}

class Canvas extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      camera: new Camera(this.refs.canvas, this.props.worldMap)
    }
  }

  componentDidMount () {
    this.setCamera();
  }

  setCamera () {
      const canvas = this.refs.canvas;
      const ctx = this.refs.canvas.getContext('2d');

      this.state.camera.follow(this.props.player);
      this.state.camera.update();
      this.state.camera.draw(ctx, this.props.worldMap);

  }

  componentWillReceiveProps() {
    this.drawNewMap();
  }

  drawNewMap () {
    this.state.camera.update();
    const canvas = this.refs.canvas;
    canvas.width = 750;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.state.camera.draw(ctx, this.props.worldMap);
    this.props.player.draw(ctx, this.props.worldMap);
  }


  render() {
      return (
        <canvas ref="canvas" width="750" height="750"></canvas>
      )
  }

}


ReactDOM.render(
  <Map key={0}/>,
  document.getElementById('root')
);
