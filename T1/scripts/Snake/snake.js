class Snake {
    constructor(position) {
        this.direction = undefined;
        this.head = position;
        this.body = [];
        this.tail = undefined;
    }

    update() {
        this.checkCollision();
        let velocity;
        if (this.direction == 'up') velocity = new p5.Vector(0, -1);
        if (this.direction == 'down') velocity = new p5.Vector(0, 1);
        if (this.direction == 'left') velocity = new p5.Vector(-1, 0);
        if (this.direction == 'right') velocity = new p5.Vector(1, 0);

        this._move(velocity);
    }

    show() {
        for (const part of this.body) {
            stroke(0);
            fill(0);
            rect(part.x * upscale, part.y * upscale, upscale, upscale);
        }
        stroke(255, 255, 0);
        fill(255, 255, 0);
        rect(this.head.x * upscale, this.head.y * upscale, upscale, upscale);
        // if (keyIsDown(UP_ARROW))
        //     this.changeDirection(UP_ARROW);
        // if (keyIsDown(DOWN_ARROW))
        //     this.changeDirection(DOWN_ARROW);
        // if (keyIsDown(LEFT_ARROW))
        //     this.changeDirection(LEFT_ARROW);
        // if (keyIsDown(RIGHT_ARROW))
        //     this.changeDirection(RIGHT_ARROW);
    }

    changeDirection(keydown) {
        switch (keydown) {
            case UP_ARROW:
                if (this.direction != 'down') {
                    this.direction = 'up';
                    this._move(new p5.Vector(0, -1));
                }
                this.checkCollision();
                return;
            case DOWN_ARROW:
                if (this.direction != 'up') {
                    this.direction = 'down';
                    this._move(new p5.Vector(0, 1));
                }
                return;
            case LEFT_ARROW:
                if (this.direction != 'right') {
                    this.direction = 'left';
                    this.checkCollision();
                    this._move(new p5.Vector(-1, 0));
                }
                return;
            case RIGHT_ARROW:
                if (this.direction != 'left') {
                    this.direction = 'right';
                    this.checkCollision();
                    this._move(new p5.Vector(1, 0));
                }
                return;
        }
    }

    addBodyPart() {
        if (!this.tail) {
            if (this.body.length > 0) {
                const x = this.body[this.body.length - 1].x;
                const y = this.body[this.body.length - 1].y;
                this.tail = new p5.Vector(x, y);
            } else {
                this.tail = new p5.Vector(this.head.x, this.head.y);
            }
        }
    }

    checkCollision() {
        let died = false;
        for (const part of this.body) {
            const headx = this.head.x;
            const heady = this.head.y;
            if (headx == part.x && heady == part.y) {
                died = true;
                break;
            }
        }
        if (this.head.x < 0 || this.head.x >= width / upscale || this.head.y < 0 || this.head.y >= height / upscale) died = true;
        if (died) {
            this.body.splice(0, this.body.length)
            this.head = new p5.Vector(width / 2 / upscale, height / 2 / upscale);
            this.direction = undefined;
        }
    }

    _move(direction) {
        if (this.body.length > 0) {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            this.body[0].x = this.head.x;
            this.body[0].y = this.head.y
        }
        this.head.add(direction);
        if (this.tail && this.tail != this.body[this.body.length - 1] && this.tail != this.head) {
            this.body.push(this.tail);
            this.tail = undefined;
        }
    }
}