class Paddle {
  constructor(position, size) {
    this.position = position;
    this.width = size.width;
    this.height = size.height;
  }

  show() {
    stroke(255);
    fill(255);
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  moveUp() {
    this.position.y -= 8;
    if (this.position.y < 0) this.position.y = 0;
  }

  moveDown() {
    this.position.y += 8;
    if (this.position.y > height - this.height) this.position.y = height - this.height;
  }
}