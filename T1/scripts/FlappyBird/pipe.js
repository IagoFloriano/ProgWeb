class Pipe {
  constructor(x) {
    if (x)
      this.x = x;
    else
      this.x = width;
    this.spacing = 90;
    this.height = random(30, height - 30 - this.spacing);
    this.width = 40;
    this.xspeed = 3;
  }

  show() {
    strokeWeight(0);
    stroke(255);
    fill(255);
    rect(this.x, 0, this.width, this.height)
    rect(this.x, this.height + this.spacing, this.width, height)

    strokeWeight(3);
    stroke(0);

    line(this.x, 0, this.x, this.height);
    line(this.x, this.height, this.x + this.width, this.height);
    line(this.x + this.width, this.height, this.x + this.width, 0);

    line(this.x, this.height + this.spacing, this.x, height);
    line(this.x, this.height + this.spacing, this.x + this.width, this.height + this.spacing);
    line(this.x + this.width, this.height + this.spacing, this.x + this.width, height);
  }

  update() {
    this.x -= this.xspeed;
  }

  isOut() {
    return (this.x < -this.width);
  }

  collision(bird) {
    return (bird.x > this.x && bird.x < this.x + this.width &&
      (this.height > bird.y || this.height + this.spacing < bird.y));
  }

  stop() {
    this.xspeed = 0;
  }
}
