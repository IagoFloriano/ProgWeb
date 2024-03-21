const upscale = 20;
let snake;
let fruit;
let sound;
let delay;

function preload() {
  sound = loadSound('./sound.wav');
}

function setup() {
  cnv = createCanvas(400, 400);
  cnv.parent('snake');
  snake = new Snake(new p5.Vector(width / 2 / upscale, height / 2 / upscale));
  newFruit(0, width / upscale, 0, height / upscale);
  delay = 0;
}

function draw() {
  background(220);
  grid();
  showFruit();
  if (delay == 0)
    snake.update();
  snake.show();
  if (snake.head.x == fruit.x && snake.head.y == fruit.y) {
    snake.addBodyPart();
    newFruit(0, width / upscale, 0, height / upscale);
    sound.play();
  }
  delay = (delay + 1) % 6;
}

function keyPressed() {
  snake.changeDirection(keyCode);
  delay = 1;
}

function newFruit(minx, maxx, miny, maxy) {
  fruit = new p5.Vector(int(random(minx, maxx)), int(random(miny, maxy)));
}

function showFruit() {
  stroke(0, 0, 255);
  fill(0, 0, 255);
  rect(fruit.x * upscale, fruit.y * upscale, upscale, upscale);
}

function grid() {
  stroke(0);
  noFill();
  for (let i = 0; i < width / upscale; i++) {
    for (let j = 0; j < height / upscale; j++) {
      rect(i * upscale, j * upscale, upscale, upscale)
    }
  }
  stroke(255);
  noFill();
  rect(1, 1, width - 1, height - 1);
}
