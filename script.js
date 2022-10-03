const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

//Generate different images for player and map.
const backgroundImage = new Image();
backgroundImage.src = "./gameTwoAssets/tilemapforbrowsergame.png";

const playerImage = new Image();
playerImage.src = "./gameTwoAssets/player-character.png";

//Create a class
class Sprite {
  constructor({ position, velocity, backgroundImage }) {
    this.position = position;
    this.backgroundImage = backgroundImage;
  }

  draw() {
    context.drawImage(this.backgroundImage, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: -631,
    y: -432,
  },
  backgroundImage: backgroundImage,
});

playerImage.onload = () => {
  //Draw player image on map, then position it, so it's in the middle. Then fix the size, so it fits the game.
  context.drawImage(
    playerImage,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 2,
    8,
    7
  );
};

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

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(
    playerImage,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 2,
    8,
    7
  );
  if (keys.w.pressed && lastKeyPressed === "w") background.position.y += 1;
  else if (keys.a.pressed && lastKeyPressed === "a") background.position.x += 1;
  else if (keys.s.pressed && lastKeyPressed === "s") background.position.y -= 1;
  else if (keys.d.pressed && lastKeyPressed === "d") background.position.x -= 1;
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
