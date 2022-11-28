/*
    Sources of Images

    Tuxedo = http://opengameart.org/users/dezrasdragons
    ChestRed = http://opengameart.org/users/hippo
    Dragon = http://opengameart.org/content/dragon-pixel-art
    Earth019 (evil tree) = http://opengameart.org/users/emerald

*/

// Resource gathering  -  https://stackoverflow.com/questions/35261956/javascript-game-code-running-very-slow


const playerImg = new Image();
const enemyImg = new Image();
const itemChest = new Image();
const pt1 = new Image();
const pt2 = new Image();
const pt3 = new Image();
const pt4 = new Image();
const dragon = new Image();

export default class ImageList {

  constructor() {
    this.imageSrcs = ['img/Tuxedo.png', 'img/ChestRed.png', 'img/earth019.png', 'img/pt1.png', 'img/pt2.png', 'img/pt3.png', 'img/pt4.png', 'img/dragon.png'];
    this.imgList = [playerImg, enemyImg, itemChest, pt1, pt2, pt3, pt4, dragon];
    this.loadCount = 0;
  }

  loadImages() {
     for(var i = 0; i< this.imgList.length; i++) {
         this.loadImage(this.imgList[i], this.imageSrcs[i]);
     }
  }

  loadImage(img, src) {
      img.addEventListener('load', this.imageLoaded());
      img.src = src;
  }

  imageLoaded() {
     this.loadCount++;
     if(this.loadCount === this.imgList.length) {
        this.startGame();
     }
   }

   startGame () {
     console.log("game started")
   }
}
