class Ship extends Mass {
  constructor(x, y, power, weaponPower) {
    super(x, y, 10, 20, 1.5 * Math.PI);
    this.thrusterPower = power;
    this.steeringPower = power / 20;
    this.rightThruster = false;
    this.leftThruster = false;
    this.thrusterOn = false;
    this.retroOn = false;
    this.weaponPower = weaponPower || 200;
    this.loaded = false;
    this.weaponReloadTime = 0.25; // seconds
    this.timeUntilReloaded = this.weaponReloadTime;
    this.compromised = false;
    this.maxHealth = 2;
    this.health = this.maxHealth;
  }

  draw(context, guide) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    if (guide && this.compromised) {
      context.save();
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    }
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.fillStyle = 'black';
    drawShip({
      context,
      radius: this.radius,
      options: {
        guide,
        thruster: this.thrusterOn,
      },
    });
    context.restore();
  }

  update(elapsed, context) {
    this.push(this.angle, (this.thrusterOn - this.retroOn) * this.thrusterPower, elapsed);
    this.twist((this.rightThruster - this.leftThruster) * this.steeringPower, elapsed);
    this.loaded = this.timeUntilReloaded === 0;
    if (!this.loaded) {
      this.timeUntilReloaded -= Math.min(elapsed, this.timeUntilReloaded);
    }
    if (this.compromised) {
      this.health -= Math.min(elapsed, this.health);
    }
    super.update(elapsed, context);
  }

  projectile(elapsed) {
    let p = new Projectile(
      this.x + Math.cos(this.angle) * this.radius,
      this.y + Math.sin(this.angle) * this.radius,
      0.025,
      1,
      this.xSpeed,
      this.ySpeed,
      this.rotationSpeed,
    );
    p.push(this.angle, this.thrusterOn * this.thrusterPower, elapsed);
    this.push(this.angle + Math.PI, this.weaponPower, elapsed);
    this.timeUntilReloaded = this.weaponReloadTime;
    return p;
  }
}
