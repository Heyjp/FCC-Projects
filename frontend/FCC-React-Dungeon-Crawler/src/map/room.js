import React from 'react';
import {random} from '../utils/utils.js'

const SQUARE = 1;

export default class Room  {

  constructor (container) {
    this.x = container.x + random(0, Math.floor(container.w / 3));
    this.y = container.y + random(0, Math.floor(container.h / 3));
    this.w = container.w - (this.x - container.x);
    this.h = container.h - (this.y - container.y);
    this.w -= random(0, this.w / 3);
    this.h -= random(0, this.w / 3);

    return this;
  }

  paint (c) {
    c.fillStyle = "#888";
    c.fillRect(this.x * SQUARE, this.y * SQUARE, this.w * SQUARE, this.h * SQUARE);
  }


}
