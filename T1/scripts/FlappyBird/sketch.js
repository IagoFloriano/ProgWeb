let b;
let pipes = [];
let deadbird = false;
let score = 0;

function setup() {
  cnv = createCanvas(600, 400);
  cnv.parent('flappybird');
  b = new Bird();
  noLoop();
  background(51);
}

function draw() {
  background(51);

  stroke(238);
  strokeWeight(1);
  noFill();
  rect(0, 0, width, height);

  if (frameCount % 120 == 0)
    pipes.push(new Pipe);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].collision(b)) {
      deadbird = true;
    }
    if (pipes[i].isOut()) {
      pipes.splice(i, 1);
      score++;
    }
  }
  if (b.update() == 'dead')
    deadbird = true;
  b.show();


  if (deadbird) {
    for (let pipe of pipes) {
      pipe.stop();
    }
  }

  stroke(0);
  strokeWeight(5);
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text(score, width / 2, 60)
}

function keyPressed() {
  if (key == ' ' && !deadbird) {
    loop();
    b.jump();
  }
  if (key == 'r' && deadbird) {
    deadbird = false;
    score = 0;
    pipes.splice(0, pipes.length);
    setup();
  }
}
