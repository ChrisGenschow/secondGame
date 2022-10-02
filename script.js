const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

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
    context.drawImage(this.backgroundImage, -631, -432);
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

function animate() {
  window.requestAnimationFrame(animate);
  context.drawImage(
    playerImage,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 2,
    8,
    7
  );
  console.log("animatePlayer");
  background.draw();
}
animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      console.log("w meep meep");
      break;
    case "a":
      console.log("a meep meep");
      break;
    case "s":
      console.log("s meep meep");
      break;
    case "d":
      console.log("d meep meep");
      break;
  }
});
