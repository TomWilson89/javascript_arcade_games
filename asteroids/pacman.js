class PacMan {
  constructor(context, x, y, radius, speed) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = 0;
    this.xSpeed = speed;
    this.ySpeed = 0;
    this.time = 0;
    this.mouth = 0;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    drawPacman({
      context,
      radius: this.radius,
      mouthAngle: this.mouth,
    });
    context.restore();
  }

  turn(direction) {
    if (this.ySpeed) {
      // if we are travelling vertically
      // set the horizontal speed and apply direction
      this.xSpeed = -direction * this.ySpeed;
      // clear the vertical speed and rotate
      this.ySpeed = 0;
      // this.angle = Math.atan2(this.xSpeed, this.ySpeed);
      this.angle = this.xSpeed > 0 ? 0 : Math.PI;
    } else {
      // if we are travelling horizontally
      // set the vertical speed and apply direction
      this.ySpeed = direction * this.xSpeed;
      // clear the horizontal speed and rotate
      this.xSpeed = 0;
      // this.angle = Math.atan2(this.xSpeed, this.ySpeed);
      this.angle = this.ySpeed > 0 ? 0.5 * Math.PI : 1.5 * Math.PI;
    }
  }

  turnLeft() {
    this.turn(-1);
  }

  turnRight() {
    this.turn(1);
  }

  update(elapsed, width, height) {
    // an average of once per 100 frames
    if (Math.random() <= 0.01) {
      if (Math.random() < 0.5) {
        this.turnLeft();
      } else {
        this.turnRight();
      }
    }

    if (this.x - this.radius + elapsed * this.xSpeed > width) {
      this.x = -this.radius;
    }

    if (this.x + this.radius + elapsed * this.xSpeed < 0) {
      this.x = width + this.radius;
    }

    if (this.y - this.radius + elapsed * this.ySpeed > height) {
      this.y = -this.radius;
    }

    if (this.y + this.radius + elapsed * this.ySpeed < 0) {
      this.y = height + this.radius;
    }

    this.x += elapsed * this.xSpeed;
    this.y += elapsed * this.ySpeed;
    this.time += elapsed;
    this.mouth = Math.abs(Math.sin(2 * Math.PI * this.time));
  }
}
