const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

const collisionsMap = [];
for (let loopIndex = 0; loopIndex < collisions.length; loopIndex += 70) {
  collisionsMap.push(collisions.slice(loopIndex, 70 + loopIndex));
}

console.log(collisionsMap);
//Generate different images for player and map.
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
  backgroundImage: backgroundImage,
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

const movables = [background, ...boundaries, foreground];

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

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  //foreground.draw();

  let moving = true;
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
              y: boundary.position.y + 1,
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
        movable.position.y += 1;
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
              x: boundary.position.x + 1,
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
        movable.position.x += 1;
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
              y: boundary.position.y - 1,
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
        movable.position.y -= 1;
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
              x: boundary.position.x - 1,
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
        movable.position.x -= 1;
      });
  }
}
animate();

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
