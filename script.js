const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");
console.log(gsap);

const collisionsMap = [];
for (let loopIndex = 0; loopIndex < collisions.length; loopIndex += 70) {
  collisionsMap.push(collisions.slice(loopIndex, 70 + loopIndex));
}

const battleZonesMap = [];
for (let loopIndex = 0; loopIndex < battleZonesData.length; loopIndex += 70) {
  battleZonesMap.push(battleZonesData.slice(loopIndex, 70 + loopIndex));
}
console.log(battleZonesMap);

console.log(collisionsMap);

const battleZones = [];
//Generate different images for player, foreground and map.

const backgroundImage = new Image();
backgroundImage.src = "./gameTwoAssets/tilemapforbrowsergame.png";

const foregroundImage = new Image();
foregroundImage.src = "./gameTwoAssets/foreground.png";

const playerImage = new Image();
playerImage.src = "./gameTwoAssets/player-character.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 12 / 2,
    y: canvas.height / 2 - 12 / 2,
  },
  backgroundImage: playerImage,
  frames: {
    max: 1,
  },
});
/*canvas.width / 2 - this.backgroundImage.width / 2,
canvas.height / 2 - this.backgroundImage.height / 2,*/

const boundaries = [];
const offset = (loopIndex = {
  x: -631,
  y: -432,
});
collisionsMap.forEach((row, loopIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 451)
      boundaries.push(
        new Boundary({
          position: {
            x: symbolIndex * Boundary.width + offset.x,
            y: loopIndex * Boundary.height + offset.y,
          },
        })
      );
    else if (symbol === 375)
      boundaries.push(
        new Boundary({
          position: {
            x: symbolIndex * Boundary.width + offset.x,
            y: loopIndex * Boundary.height + offset.y,
          },
        })
      );
  });
});

battleZonesMap.forEach((row, loopIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 514)
      battleZones.push(
        new Boundary({
          position: {
            x: symbolIndex * Boundary.width + offset.x,
            y: loopIndex * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(battleZones);

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  backgroundImage: backgroundImage,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  backgroundImage: foregroundImage,
});

/*playerImage.onload = () => {
  //Draw player image on map, then position it, so it's in the middle. Then fix the size, so it fits the game.
  context.drawImage(
    playerImage,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 2,
    8,
    7
  );
};*/

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
//Define which objects to move when pressing "WASD", obviously we're not gonna move the actual player, we're moving the background, and some other objects.
const movables = [background, ...boundaries, foreground, ...battleZones];

//Add rectangles, so we can use them for collision.
function rectangularCollisions({ gameTwoRectangle1, gameTwoRectangle2 }) {
  return (
    gameTwoRectangle1.position.x + gameTwoRectangle1.width >=
      gameTwoRectangle2.position.x &&
    gameTwoRectangle1.position.x <=
      gameTwoRectangle2.position.x + gameTwoRectangle2.width &&
    gameTwoRectangle1.position.y <=
      gameTwoRectangle2.position.y + gameTwoRectangle2.height &&
    gameTwoRectangle1.position.y + gameTwoRectangle1.height >=
      gameTwoRectangle2.position.y
  );
}

const battle = {
  initiated: false,
};

//This function basically animates the whole game world when we move. It also draws the different objects and layers.
function animate() {
  const mapAnimationId = window.requestAnimationFrame(animate);
  console.log(mapAnimationId);
  //Draw the background/gamemap.
  background.draw();
  //Draw the collisionboxes. This is muy importante.
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  //Draw out the battleZone layer, so we can use it for pokemon-esque fights.
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });
  //Draw out the player.
  player.draw();
  //Draw the foreground. It is very important that this is done AFTER player.draw(), since we want the play to be able to go behind this layer.
  foreground.draw();

  let moving = true;

  console.log(mapAnimationId);
  if (battle.initiated) return;
  //Finetune the intersecteion between player and battleZone, so that it'll only trigger when a larger portion of the player is on a battleZone tile. Also, we'll trigger pokemon-esque battles like this.
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let loopIndex = 0; loopIndex < battleZones.length; loopIndex++) {
      const battleZone = battleZones[loopIndex];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollisions({
          gameTwoRectangle1: player,
          gameTwoRectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        console.log("ACTIVATE B-B-B-BATTLE!");

        //Deactivate current animation loop.
        window.cancelAnimationFrame(mapAnimationId);
        battle.initiated = true;
        gsap.to(".battleInitiatedAnimationBox", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to(".battleInitiatedAnimationBox", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                //Activate a new animation loop
                initializeBattle();
                animateBattle();
                gsap.to(".battleInitiatedAnimationBox", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  //Assign movement to the WASD keys. Instead of moving the player, we're moving everything in the movables array, kind of like that one Futurama episode.
  if (keys.w.pressed && lastKeyPressed === "w") {
    for (let loopIndex = 0; loopIndex < boundaries.length; loopIndex++) {
      const boundary = boundaries[loopIndex];
      if (
        rectangularCollisions({
          gameTwoRectangle1: player,
          gameTwoRectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 0.7,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 0.7;
      });
  } else if (keys.a.pressed && lastKeyPressed === "a") {
    for (let loopIndex = 0; loopIndex < boundaries.length; loopIndex++) {
      const boundary = boundaries[loopIndex];
      if (
        rectangularCollisions({
          gameTwoRectangle1: player,
          gameTwoRectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 0.7,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 0.7;
      });
  } else if (keys.s.pressed && lastKeyPressed === "s") {
    for (let loopIndex = 0; loopIndex < boundaries.length; loopIndex++) {
      const boundary = boundaries[loopIndex];
      if (
        rectangularCollisions({
          gameTwoRectangle1: player,
          gameTwoRectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 0.7,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 0.7;
      });
  } else if (keys.d.pressed && lastKeyPressed === "d") {
    for (let loopIndex = 0; loopIndex < boundaries.length; loopIndex++) {
      const boundary = boundaries[loopIndex];
      if (
        rectangularCollisions({
          gameTwoRectangle1: player,
          gameTwoRectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 0.7,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 0.7;
      });
  }
}
//animate();

let lastKeyPressed = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKeyPressed = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKeyPressed = "a";
      break;
    case "s":
      lastKeyPressed = "s";
      keys.s.pressed = true;
      break;
    case "d":
      lastKeyPressed = "d";
      keys.d.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
