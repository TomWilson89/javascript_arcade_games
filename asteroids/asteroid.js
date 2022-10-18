class Asteroid extends Mass {
  constructor(x, y, mass, xSpeed, ySpeed, rotationSpeed) {
    let density = 1; // kg per square pixel
    const radius = Math.sqrt(mass / density / Math.PI);
    super(x, y, mass, radius, 0, xSpeed, ySpeed, rotationSpeed);
    this.circumference = 2 * Math.PI * this.radius;
    this.segments = Math.ceil(this.circumference / 15);
    this.segments = Math.min(25, Math.max(5, this.segments));
    this.noise = 0.2;
    this.shape = [];
    for (let i = 0; i < this.segments; i++) {
      this.shape.push(2 * Math.random() - 0.5);
    }
  }

  child(mass) {
    return new Asteroid(this.x, this.y, mass, this.xSpeed, this.ySpeed, this.rotationSpeed);
  }

  // update(elapsed) {
  //   if (this.x - this.radius + elapsed * this.xSpeed > this.ctx.canvas.width) {
  //     this.x = -this.radius;
  //   }
  //   if (this.x + this.radius + elapsed * this.xSpeed < 0) {
  //     this.x = this.ctx.canvas.width + this.radius;
  //   }

  //   if (this.y - this.radius + elapsed * this.ySpeed > this.ctx.canvas.height) {
  //     this.y = -this.radius;
  //   }

  //   if (this.y + this.radius + elapsed * this.ySpeed < 0) {
  //     this.y = this.ctx.canvas.height + this.radius;
  //   }

  //   this.x += elapsed * this.xSpeed;
  //   this.y += elapsed * this.ySpeed;
  //   this.angle = (this.angle + elapsed * this.rotationSpeed) % (2 * Math.PI);
  // }

  draw(ctx, guide) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    drawAsteroid({
      context: ctx,
      radius: this.radius,
      shape: this.shape,
      options: {
        guide,
        noise: this.noise,
      },
    });
    ctx.restore();
  }
}
