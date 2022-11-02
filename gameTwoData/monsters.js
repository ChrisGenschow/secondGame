const monsters = {
  Hearty: {
    position: {
      x: 60,
      y: 67,
    },
    backgroundImage: {
      src: "./gameTwoAssets/hearty.png",
    },
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
    backgroundImage: {
      src: "./gameTwoAssets/blobEnemy.png",
    },
    frames: {
      max: 4,
    },
    IsEnemy: true,
    name: "Blob",
    attacks: [attacks.Talk, attacks.HighFive, attacks.Wiggle],
  },
};
