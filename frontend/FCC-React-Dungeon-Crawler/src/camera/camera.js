/*
  Camera code based on Gustavo Carvalho on stack overflow

  http://stackoverflow.com/questions/16919601/html5-canvas-camera-viewport-how-to-actally-do-it
*/


import React from 'react';

export default class Camera  {

  constructor (canvas, theMap) {
    this.x = 0;
    this.y = 0

    this.xView = 750;
    this.yView = 750;

    this.centerX = this.xView / 2;
    this.centerY = this.yView / 2;

    // the deadzone
    this.deadZoneY = 0;

    // map dimensions
    this.worldW = theMap.width;
    this.worldH = theMap.height;
  }

  follow (followObj) {
    this.follow = followObj;
  }

  update () {
    // Camera within the boundaries of the world map
    if (this.follow.x - this.centerX < 0) {
        this.x = 0;
    } else if (this.follow.x + this.centerX > this.worldW) {
        this.x = this.worldW - this.xView;
    } else {
        this.x = this.follow.x - this.centerX;
    }

    if (this.follow.y - this.centerY < 0) {
        this.y = 0;
    } else if (this.follow.y + this.centerY > this.worldH) {
        this.y = this.worldH - this.yView;
    } else {
        this.y = this.follow.y - this.centerY;
    }
  }

  draw (ctx, theMap) {
    // ctx.clearRect(0, 0, this.xView, this.yView);
    ctx.drawImage(theMap, this.x, this.y, this.xView, this.yView, 0, 0, this.xView, this.yView);
  }
}
