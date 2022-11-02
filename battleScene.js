const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./gameTwoAssets/Pokemonbattlebackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  backgroundImage: battleBackgroundImage,
});

let blob;

let hearty;

let renderedSprites;

let battleAnimationId;
let queue;

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  console.log(battleAnimationId);
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

function initializeBattle() {
  document.querySelector(".userInterface").style.display = "block";
  document.querySelector(".battleDialogueBox").style.display = "none";
  document.querySelector(".enemyHpAmountLeft").style.width = "100%";
  document.querySelector(".movesMenu").replaceChildren();
  blob = new Monster(monsters.Blob);
  hearty = new Monster(monsters.Hearty);
  renderedSprites = [blob, hearty];
  queue = [];

  hearty.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector(".movesMenu").append(button);
    button.classList.add("basicAttackButton");
  });
  //Event listeners for battle buttons (attacks).

  document.querySelectorAll(".basicAttackButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      hearty.attack({
        attack: selectedAttack,
        recipient: blob,
        renderedSprites,
      });

      if (blob.health <= 0) {
        queue.push(() => {
          blob.faint();
        });
        queue.push(() => {
          //Fade to black
          gsap.to(".battleInitiatedAnimationBox", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector(".userInterface").style.display = "none";
              gsap.to(".battleInitiatedAnimationBox", {
                opacity: 0,
              });
            },
          });
        });
      }
      //Blob or enemy attacks right here.
      const randomAttack =
        blob.attacks[Math.floor(Math.random() * blob.attacks.length)];

      queue.push(() => {
        blob.attack({
          attack: randomAttack,
          recipient: hearty,
          renderedSprites,
        });

        if (hearty.health <= 0) {
          queue.push(() => {
            hearty.faint();
          });
        }
      });
    });
    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector(".attackType").innerHTML =
        "Type: " + selectedAttack.type;
      document.querySelector(".attackType").style.color = selectedAttack.color;
    });
  });
}

initializeBattle();
animateBattle();

document.querySelector(".battleDialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
