import React from 'react';

class Tree {

  constructor(leaf) {
    this.leaf = leaf;
    this.lchild = undefined;
    this.rchild = undefined;
  }

  getLeafs () {
    if (this.lchild === undefined && this.rchild === undefined) {
        return [this.leaf];
    } else {
        return [].concat(this.lchild.getLeafs(), this.rchild.getLeafs())
    }
  }

  getLevel(level, queue) {
    if (queue === undefined) {
      queue = [];
    }

    if (level == 1) {
      queue.push(this);
    } else {
      if (this.lchild !== undefined) {
        this.lchild,getLevel(level - 1, queue)
      }
      if (this.rchild !== undefined) {
        this.rchild.getLevle(level -1, queue)
      }
    }
    return queue;
  }

  paint (c) {
    this.leaf.paint(c);

    if (this.lchild !== undefined) {
      this.lchild.paint(c)
    }
    if (this.rchild !== undefined) {
      this.rchild.paint(c)
    }
  }

}


export {Tree as default}
