let cnv;
let right;
let left;
let lscore = 0;
let rscore = 0;
const pWidth = 10;
const pHeight = 125;
let ball;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.parent('pong')
  right = new Paddle(new p5.Vector(width - pWidth - 5, 0), {
    width: pWidth,
    height: pHeight
  });
  left = new Paddle(new p5.Vector(pWidth - 5, 0), {
    width: pWidth,
    height: pHeight
  });
  ball = new Ball();
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  rect(0, 0, width, height)
  const exit = ball.update();
  if (exit == "right") {
    lscore++;
  } else if (exit == "left") {
    rscore++;
  }
  textSize(50);
  fill(255);
  textAlign(CENTER);
  text(lscore + " | " + rscore, width / 2, 60);
  ball.show();
  ball.collidePaddle(left);
  ball.collidePaddle(right);
  left.show();
  right.show();
  if (keyIsDown(UP_ARROW)) right.moveUp();
  if (keyIsDown(DOWN_ARROW)) right.moveDown();
  if (keyIsDown(87)) left.moveUp();
  if (keyIsDown(83)) left.moveDown();
}
