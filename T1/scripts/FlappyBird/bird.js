class Bird {
  constructor() {
    this.size = 30;
    this.x = this.size + 20;;
    this.y = height / 2;
    this.yspeed = 0;
    this.gravity = 0.9;
    this.jumpforce = 10;
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    if (this.y > height - this.size / 2) {
      this.y = height - this.size / 2;
      this.yspeed = 0;
      this.gravity = 0;
      return 'dead';
    }
    this.yspeed += this.gravity;
    this.y += this.yspeed;
    if (this.y < this.size / 2) {
      this.y = this.size / 2;
    }
  }

  jump() {
    if (this.gravity != 0) {
      this.yspeed = -this.jumpforce;
    }
  }
}
