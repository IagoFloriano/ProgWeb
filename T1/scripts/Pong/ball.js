class Ball {
  constructor() {
    this.position = new p5.Vector(width / 2, height / 2);
    this.speed = p5.Vector.random2D();
    if (this.speed.x < 0.5)
      this.speed.x = 0.5;
    this.speed.setMag(3);
    this.radius = 18;
  }

  show() {
    const x = this.position.x;
    const y = this.position.y;
    fill(255);
    stroke(255);
    ellipse(x, y, this.radius, this.radius);
  }

  update() {
    this.position.add(this.speed);
    if (this.position.y > height - this.radius || this.position.y < 0)
      this.speed.y *= -1;
    if (this.position.x > width) {
      this.position = new p5.Vector(width / 2, height / 2);
      this.speed = p5.Vector.random2D();
      if (this.speed.x < 0.5)
        this.speed.x = 0.5;
      this.speed.setMag(3);
      return "right";
    }
    if (this.position.x < 0) {
      this.position = new p5.Vector(width / 2, height / 2);
      this.speed = p5.Vector.random2D();
      if (this.speed.x < 0.5)
        this.speed.x = 0.5;
      this.speed.setMag(3);
      return "left";
    }
  }

  collidePaddle(paddle) {
    if (Math.abs(this.position.x - paddle.position.x) <= this.radius) {
      if (this.position.y + this.radius >= paddle.position.y) {
        if (this.position.y - this.radius <= paddle.position.y + paddle.height) {
          this.speed.x *= -1;
          const ydist = this.position.y - paddle.position.y;
          this.speed.y = map(ydist, 0, paddle.height, -3, 3);
          this.speed.setMag(3);
        }
      }
    }
  }
}