
function Point(x, y) {
    this.x = x;
    this.y = y;
}



function Container(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.center = new Point(
        this.x + (this.w / 2),
        this.y + (this.h / 2)
    )
}

function checkOverlap(object, x, y) {

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].key === this.key) {
            continue;
        }
        let x, y, w, h;
        x = enemies[i].x;
        y = enemies[i].y;
        w = enemies[i].w;
        h = enemies[i].h;

        // Either x or y overlaps, find a new x and y on map
        if (this.x + this.width > x && this.x + this.width <= x + w) {
            this.getLocation(leafs);
        }
        if (this.y + this.height > y && this.y + this.height <= y + h) {
            this.getLocation(leafs);
        }
    }
    return true;
}

export function populateRooms (rooms, Enemy, Potion, Weapon, Boss) {

  let mapObj = [];
  let bossRoom = random(0, rooms.length);

  for (let i = 0; i < rooms.length; i++) {
    mapObj = mapObj.concat(createObjects(Enemy, 1, 5, rooms[i]))
    .concat(createObjects(Potion, 0, 2, rooms[i]))
    .concat(createObjects(Weapon, 0, 1, rooms[i]));

    if (i === bossRoom) {
        let boss = new Boss();
        boss.room = rooms[i];
        mapObj.push(boss);
    }
  }
  getItemLocations(mapObj);
  console.log(mapObj, "this is mapObj");
  return mapObj
};


function createObjects (object, min, max, room) {
  let objArray = [];
  let num = random(min, max);

  for (let i = 0; i < num; i++) {
    let newObj = new object();
    newObj.room = room;
    objArray.push(newObj);
  }
    return objArray;
}

// cycle through all the objects, and pick a random location for each object based off its this.room data
function getItemLocations (objects) {
  for (var i = 0; i < objects.length; i++) {
    getRandomLocation(objects[i]);
  }
  return;
}


export function getRandomLocation(object) {

    // takes a random location in the room minus 40px for sprite width & height
    object.x = random(object.room.x +20, (object.room.x + object.room.w) - 40);
    object.y = random(object.room.y +20, (object.room.y + object.room.h) - 40);
    return;
}


export function clearItems (objArray) {
    for (let i = 0; i < objArray.length; i++) {
      if (objArray[i].remove !== undefined) {
        console.log(objArray[i], "removing object!");
        objArray.splice(i, 1);
      }
    }
    return objArray;
  }


  function paintWorld (worldRooms) {
    c_context.clearRect(0, 0, canvas.width, canvas.height);
    worldRooms.forEach(function (e) {
      e.paint(c_context);
    })
    draw_paths(c_context, container_tree);
  }

  function updateLocs() {
      viewRect.update();
  }

  function drawCanvas() {
      viewRect.draw();
      player.draw();
  }

  function handleItems(weapons, potions, enemies) {
      let newArray = [];
      newArray = newArray.concat(potions).concat(weapons).concat(enemies);

      newArray.forEach(function(e) {
          return randomSpot(rooms, e);
      });
      return newArray;
  }


export function changeDirection (e, player){
    player.moving = true;
        switch(e)
          {
              case 37: // left arrow
                  console.log("changeDir left");
                  player.left = true;
                  player.direction = "left";
                  break;
              case 38: // up arrow
              console.log("changeDir up");
                player.up = true;
                player.direction = "up";
                  break;
              case 39: // right arrow
              console.log("changeDir right");
                  player.right = true;
                  player.direction = "right";
                  break;
              case 40: // down arrow
              console.log("changeDir down");
                  player.down = true;
                  player.direction = "down";
                  break;
              default:
                return;
          }
  }

export function cancelDirection (e, player) {
    player.direction = false;
    player.moving = false;
      switch(e)
      {
          case 37: // left arrow
              player.left = false;
              break;
          case 38: // up arrow
              player.up = false;
              break;
          case 39: // right arrow
              player.right = false;
              break;
          case 40: // down arrow
              player.down = false;
              break;
          default:
            return;
      }
}

  function startTheGame () {
    loadImages();
  }


export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
