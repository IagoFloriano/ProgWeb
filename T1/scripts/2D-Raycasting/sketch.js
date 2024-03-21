let walls = [];
let particle;

function setup() {
    let cnv = createCanvas(400, 400);
	cnv.parent('raycasting');
    createWalls(walls);
    particle = new Particle();
}

function draw() {
    background(0);
    particle.look(walls);
    particle.show();
    for (wall of walls) {
        wall.show();
    }
    particle.moveTo(mouseX, mouseY);
}

function createWalls(walls) {
    for (let i = 0; i < 5; i++) {
        const x1 = random(width);
        const x2 = random(width);
        const y1 = random(height);
        const y2 = random(height);
        walls.push(new Boundary(x1, y1, x2, y2));
    }
    walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(width, height, width, 0));
}
