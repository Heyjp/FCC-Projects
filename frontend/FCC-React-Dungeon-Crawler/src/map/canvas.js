import React from 'react';
import Container from './container.js';
import Tree from './tree.js';
import {split_container, random_split} from './room-builder.js';
import Room from './room.js'

import {populateRooms} from '../utils/utils.js';
import {Enemy, Potion, Weapon, Boss} from '../elements/objects.js';


const MAP_SIZE = 2000;
const SQUARE = 1;
//canvas.width / MAP_SIZE;
const N_ITERATIONS = 5;

let newBox = new Container(0, 0, 2000, 2000);
let container_tree = split_container(newBox, N_ITERATIONS);
let world = container_tree.getLeafs();

let roomArray = [];
world.forEach(function (e) {
  let room = new Room(e);
  roomArray.push(room);
});

export default class WorldMap {
  constructor () {
    this.map = container_tree;
    this.rooms = roomArray;

    this.canvas = document.createElement('canvas');
    this.canvas.width = MAP_SIZE;
    this.canvas.height = MAP_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.objects = populateRooms(this.rooms, Enemy, Potion, Weapon, Boss);
  }

  drawObjects () {
    const ctx = this.ctx;
    this.objects.forEach(function (e) {
      e.draw(ctx);
    })
  }

}
