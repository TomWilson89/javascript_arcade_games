class Projectile extends Mass {
  constructor(x, y, mass, lifeTime, xSpeed, ySpeed, rotationSpeed) {
    const density = 0.001; // lowest density means we can see very light projectiles
    const radius = Math.sqrt(mass / density / Math.PI);
    super(x, y, mass, radius, 0, 0, xSpeed, ySpeed, rotationSpeed);
    this.lifeTime = lifeTime;
    this.life = 1.0;
  }

  update(elapse, context) {
    this.life -= elapse / this.lifeTime;
    super.update(elapse, context);
  }

  draw(context, guide) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    drawProjectile({
      context,
      radius: this.radius,
      life: this.life,
      guide,
    });
    context.restore();
  }
}
