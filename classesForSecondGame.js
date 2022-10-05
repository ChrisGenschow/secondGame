class Boundary {
  static width = 16;
  static height = 16;
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }

  draw() {
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
//Create a sprite class
class Sprite {
  constructor({ position, velocity, backgroundImage, frames = { max: 1 } }) {
    this.position = position;
    this.backgroundImage = backgroundImage;
    this.frames = frames;
    this.backgroundImage.onload = () => {
      this.width = this.backgroundImage.width / this.frames.max;
      this.height = this.backgroundImage.height;
      console.log(this.width);
      console.log(this.height);
    };
  }

  draw() {
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
  }
}
