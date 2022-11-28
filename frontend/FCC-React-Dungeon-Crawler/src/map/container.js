import React from 'react';

const SQUARE = 1;

class Point {
  constructor (x, y)  {
    this.x = x;
    this.y = y;
  }
}

export default class Container {

  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.center = new Point (
        this.x + (this.w / 2),
        this.y + (this.h / 2)
    )
  }

  paint (c) {
    c.strokeStyle = "#0F0";
    c.lineWidth = SQUARE;
    c.strokeRect(this.x * SQUARE, this.y * SQUARE,
        this.w * SQUARE, this.h * SQUARE
    );
  }

  drawPath (ctx, container) {
    ctx.beginPath();
    ctx.lineWidth = SQUARE * 25;
    ctx.strokeStyle = "#888";

    ctx.moveTo(this.center.x * SQUARE, this.center.y * SQUARE);
    ctx.lineTo(container.center.x * SQUARE, container.center.y * SQUARE);
    ctx.stroke();
  }

}
