class Boundary {
  static width = 16;
  static height = 16;
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }

  draw() {
    context.fillStyle = "rgba(255, 0, 0, 0)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//Create a sprite class
class Sprite {
  constructor({
    position,
    backgroundImage,
    frames = { max: 1 },

    rotation = 0,
  }) {
    this.position = position;
    this.backgroundImage = new Image();
    this.frames = frames;
    this.backgroundImage.onload = () => {
      this.width = this.backgroundImage.width / this.frames.max;
      this.height = this.backgroundImage.height;
    };
    this.backgroundImage.src = backgroundImage.src;
    this.opacity = 1;

    this.rotation = rotation;
  }

  draw() {
    context.save();
    context.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    context.rotate(this.rotation);
    context.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    context.globalAlpha = this.opacity;
    context.drawImage(
      this.backgroundImage,
      0,
      0,
      this.backgroundImage.width / this.frames.max,
      this.backgroundImage.height,
      this.position.x,
      this.position.y,
      this.backgroundImage.width / this.frames.max,
      this.backgroundImage.height
    );
    context.restore();
  }
}
class Monster extends Sprite {
  constructor({
    position,
    backgroundImage,
    frames = { max: 1 },
    rotation = 0,
    name,
    IsEnemy = false,
    attacks,
  }) {
    super({
      position,
      backgroundImage,
      frames,
      rotation,
    });
    this.name = name;
    this.health = 100;
    this.IsEnemy = IsEnemy;
    this.attacks = attacks;
  }

  faint() {
    document.querySelector(".battleDialogueBox").innerHTML =
      this.name +
      " was intimidated by it's oppenent's greatness, so it ran off.";
    gsap.to(this.position, {
      x: this.position.x + 80,
    });
    gsap.to(this, {
      opacity: 0,
    });
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector(".battleDialogueBox").style.display = "block";
    document.querySelector(".battleDialogueBox").innerHTML =
      this.name + " used " + attack.name;
    let healthBar = ".enemyHpAmountLeft";

    if (this.IsEnemy) healthBar = ".HpAmountLeft";

    let rotation = 1;
    if (this.IsEnemy) rotation = -2.2;

    recipient.health -= attack.damage;
    const timeline = gsap.timeline();
    let movementDistance = 20;
    switch (attack.name) {
      case "HighFive":
        const highfiveImage = new Image();
        highfiveImage.src = "./gameTwoAssets/bitstyleHighFive.png";
        const highfive = new Sprite({
          position: {
            x: recipient.position.x,
            y: recipient.position.y,
          },
          backgroundImage: highfiveImage,
          frames: {
            max: 1,
          },
        });
        renderedSprites.push(highfive);

        timeline
          .to(highfive.position, {
            x: highfive.position.x - 40,
            y: highfive.position.y + 20,
            duration: 0.4,
          })
          .to(highfive.position, {
            x: highfive.position.x + 60,
            y: highfive.position.y + 15,
            duration: 0.4,
          })
          .to(highfive.position, {
            x: highfive.position.x + 20,
            y: highfive.position.y - 10,
            duration: 0.4,
            onComplete: () => {
              gsap.to(healthBar, {
                width: recipient.health + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 5,
                yoyo: true,
                repeat: 5,
                duration: 0.1,
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.1,
              });
              renderedSprites.pop();
            },
          });

        break;
      case "Spit":
        const spitImage = new Image();
        spitImage.src = "./gameTwoAssets/bitstyleSpit.png";
        const spit = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          backgroundImage: spitImage,
          frames: {
            max: 1,
          },
          rotation,
        });
        renderedSprites.splice(1, 0, spit);
        gsap.to(spit.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          duration: 0.4,
          onComplete: () => {
            gsap.to(healthBar, {
              width: recipient.health + "%",
            });

            gsap.to(recipient.position, {
              x: recipient.position.x + 5,
              yoyo: true,
              repeat: 5,
              duration: 0.1,
            });
            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.1,
            });
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case "Talk":
        if (this.IsEnemy) movementDistance = -20;
        timeline
          .to(this.position, {
            y: this.position.y - movementDistance,
            duration: 0.3,
          })
          .to(this.position, {
            y: this.position.y + movementDistance * 0.25,
            duration: 0.3,
          })
          .to(this.position, {
            y: this.position.y - movementDistance,
            duration: 0.3,
          })
          .to(this.position, {
            y: this.position.y,
            onComplete: () => {
              gsap.to(healthBar, {
                width: recipient.health + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 5,
                yoyo: true,
                repeat: 5,
                duration: 0.1,
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.1,
              });
            },
          });
        break;
      case "Wiggle":
        if (this.IsEnemy) movementDistance = -20;
        timeline
          .to(this.position, {
            x: this.position.x - movementDistance,
            duration: 0.3,
          })
          .to(this.position, {
            x: this.position.x + movementDistance * 0.25,
            duration: 0.3,
          })
          .to(this.position, {
            x: this.position.x - movementDistance,
            duration: 0.3,
          })
          .to(this.position, {
            x: this.position.x,
            onComplete: () => {
              gsap.to(healthBar, {
                width: recipient.health + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 5,
                yoyo: true,
                repeat: 5,
                duration: 0.1,
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.1,
              });
            },
          });
        break;
    }
  }
}
