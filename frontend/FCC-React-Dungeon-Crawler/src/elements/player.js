import {checkContext, compareLocations} from '../utils/collision.js';
import {random, getRandomLocation} from '../utils/utils.js';


export default class Player  {

  constructor () {
    // source of img file
    this.img = new Image();
    this.img.src = 'img/Tuxedo.png';

    // source sprite from img.src
    this.sourceX = 10;
    this.sourceY = 10;
    this.sourceWidth = 15;
    this.sourceHeight = 15;
    // location to place on canvas

    this.destWidth = 20;
    this.destHeight = 20;

    // Combat Stats
    this.health = 100;

    this.maxHealth = 100;

    this.weapon = "Nunchucks";

    this.experience = 0;
    this.level = 1;

    this.baseDamage = 10;
    this.weaponDamage = 0;
    this.damage = 10;

    // movement

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

  }

  update (worldCtx, items) {

    if (!checkContext(worldCtx, this)) {
      return false
    }

    if (compareLocations (this, items)) {
        if (this.left) {
            this.x -= 10;
            this.lastMove = "left";
        }
        if (this.right) {
            this.x += 10;
            this.lastMove = "right";
        }
        if (this.up) {
            this.y -= 10;
            this.lastMove = "up";
        }
        if (this.down) {
            this.y += 10;
            this.lastMove = "down";
        }
      } else if (!compareLocations (this, items)) {
          if (this.lastMove === "left" && this.right) {
            this.x += 10;
          } else if (this.lastMove === "right" && this.left) {
            this.x -= 10
          } else if (this.lastMove === "up" && this.down) {
            this.y += 10
          } else if (this.lastMove === "down" && this.up) {
            this.y -= 10
          }
      }
    }

    draw (ctx, worldMap) {
      // Check to see whether player is in the deadZone
      this.xDeadZone = 375;
      this.yDeadZone = 375;

      let cameraX;
      let cameraY;


      if (this.x >= this.xDeadZone && this.x < worldMap.width - this.xDeadZone) {
          cameraX = this.xDeadZone;
      } else if (this.x > worldMap.width - this.xDeadZone) {
          cameraX = (this.x - worldMap.width) + this.xDeadZone * 2;
      } else {
          cameraX = this.x;
      }

      if (this.y >= this.yDeadZone && this.y < worldMap.height - this.yDeadZone) {
          cameraY = this.yDeadZone;
      } else if (this.y > worldMap.height - this.yDeadZone) {
          cameraY = (this.y - worldMap.height) + this.yDeadZone * 2;
      } else {
          cameraY = this.y;
      }

      ctx.drawImage(this.img,
          this.sourceY,
          this.sourceX,
          this.sourceWidth,
          this.sourceHeight,
          cameraX - this.destWidth / 2,
          cameraY - this.destHeight / 2,
          this.destWidth,
          this.destHeight
      );
    }

    getLocation (rooms) {
      this.room = rooms[random(0, 10)]
      getRandomLocation(this)

    }

    updateWeapon ( object) {
      this.weapon = object.name;
      this.weaponDamage = object.damage;
      this.damage = (this.baseDamage * this.level) + this.weaponDamage;
      object.remove = true;
    }

    fightEnemy (enemy) {

      this.health -= enemy.damage;
      enemy.combat(this);

      if (this.health <= 0) {
        console.log("player losing from health");
        this.lose()
      }
    }

    updateHealth (object) {
      if (this.health + object.health > this.maxHealth) {
        this.health = this.maxHealth;
      } else {
          this.health += object.health;
      }

      object.remove = true;
    }

    levelUp () {
      this.level++;
      this.maxHealth = 100 * (this.level /2);
      this.experience = this.experience % 100;
      this.health = this.maxHealth;
    }

    lose () {
      console.log("you lose right away dont do this")
      alert("You have died, try again!");
      this.dead = true;
    }


}
