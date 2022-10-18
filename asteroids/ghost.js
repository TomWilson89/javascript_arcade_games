class Ghost {
  constructor(x, y, radius, speed, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.colour = colour;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    drawGhost({
      context,
      radius: this.radius,
      options: {
        fill: this.colour,
      },
    });
    context.restore();
  }

  update(target, elapsed) {
    let angle = Math.atan2(target.y - this.y, target.x - this.x);
    let xSpeed = Math.cos(angle) * this.speed;
    let ySpeed = Math.sin(angle) * this.speed;
    this.x += xSpeed * elapsed;
    this.y += ySpeed * elapsed;
  }
}
