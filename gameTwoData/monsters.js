const heartyImage = new Image();
heartyImage.src = "./gameTwoAssets/hearty.png";
const blobImage = new Image();
blobImage.src = "./gameTwoAssets/blobEnemy.png";
const monsters = {
  Hearty: {
    position: {
      x: 60,
      y: 67,
    },
    backgroundImage: heartyImage,
    frames: {
      max: 1,
    },
    name: "Player",
    attacks: [attacks.Talk, attacks.HighFive, attacks.Wiggle, attacks.Spit],
  },
  Blob: {
    position: {
      x: 200,
      y: 15,
    },
    backgroundImage: blobImage,
    frames: {
      max: 4,
    },
    IsEnemy: true,
    name: "Blob",
    attacks: [attacks.Talk, attacks.HighFive, attacks.Wiggle],
  },
};
