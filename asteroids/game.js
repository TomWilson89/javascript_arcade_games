function collision(obj1, obj2) {
  return distanceBetween(obj1, obj2) < obj1.radius + obj2.radius;
}

function distanceBetween(obj1, obj2) {
  return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
}

class AsteroidGame {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.canvas.focus();
    this.guide = false;
    this.shipMass = 10;
    this.shipRadius = 15;
    this.asteroidMass = 5000; // Mass of an asteroid
    this.asteroidPush = 500000; // max force to apply in one frame

    this.canvas.addEventListener('keyup', this.keyUp.bind(this));
    this.canvas.addEventListener('keydown', this.keyDown.bind(this));
    this.healhIndicator = new Indicator('health', 5, 5, 100, 10);
    this.scoreIndicator = new Indicator('score', this.canvas.width - 10, 5, 100, 10);
    this.fpsIndicator = new Indicator('fps', this.canvas.width - 10, this.canvas.height - 15, 100, 10, {
      digits: 2,
    });
    this.massDestroyed = 500;
    this.score = 0;
    this.gameOver = false;
    this.gameOverMessage = new Indicator('game over', this.canvas.width / 2, this.canvas.height * 0.4, 100, 10);
    this.levelIndicator = new Indicator('level', this.canvas.width / 2, 5, 100, 10, {
      align: 'center',
    });
    window.requestAnimationFrame(this.frame.bind(this));
    this.resetGame();
  }

  resetGame() {
    this.level = 0;
    this.gameOver = false;
    this.score = 0;
    this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2, 1000, 200);
    this.projectiles = [];
    this.asteroids = [];
    this.levelUp();
  }

  movingAsteroid(elapsed) {
    const asteroid = this.newAsteroid();
    this.pushAsteroid(asteroid, elapsed);
    return asteroid;
  }

  newAsteroid() {
    return new Asteroid(this.canvas.width * Math.random(), this.canvas.height * Math.random(), this.asteroidMass);
  }

  pushAsteroid(asteroid, elapsed = 0.015) {
    asteroid.push(2 * Math.PI * Math.random(), this.asteroidPush, elapsed);
    asteroid.twist((Math.random() - 0.5) * Math.PI * this.asteroidPush * 0.02, elapsed);
  }

  keyUp(e) {
    this.keyHandler(e, false);
  }

  keyDown(e) {
    this.keyHandler(e, true);
  }

  keyHandler(e, value) {
    let key = e.key || e.keyCode;
    let unhandledKey = false;
    switch (key) {
      case 'ArrowUp':
      case 38:
        this.ship.thrusterOn = value;
        break;
      case 'ArrowLeft':
      case 37:
        this.ship.leftThruster = value;
        break;
      case 'ArrowRight':
      case 39:
        this.ship.rightThruster = value;
        break;
      case 'ArrowDown':
      case 40:
        this.ship.retroOn = value;
        break;
      case ' ':
      case 32:
        if (this.gameOver) {
          this.resetGame();
        } else {
          this.ship.trigger = value;
        }
        break;
      case 'g':
      case 71:
        if (value) this.guide = !this.guide;
        break;
      default:
        unhandledKey = true;
        break;
    }
    if (!unhandledKey) e.preventDefault();
  }

  frame(timestamp) {
    if (!this.previous) this.previous = timestamp;
    const elapsed = timestamp - this.previous;
    this.fps = 1000 / elapsed;
    this.update(elapsed / 1000);
    this.draw();
    this.previous = timestamp;
    window.requestAnimationFrame(this.frame.bind(this));
  }

  update(elapsed) {
    if (this.asteroids.length === 0) {
      this.levelUp();
    }
    this.ship.compromised = false;
    this.asteroids.forEach(asteroid => {
      asteroid.update(elapsed, this.context);
      if (collision(asteroid, this.ship)) {
        this.ship.compromised = true;
      }
    }, this);
    if (this.ship.health <= 0) {
      this.gameOver = true;
      return;
    }
    this.ship.update(elapsed, this.context);
    this.projectiles.forEach((projectile, i, projectiles) => {
      projectile.update(elapsed, this.context);
      if (projectile.life <= 0) {
        projectiles.splice(i, 1);
      } else {
        this.asteroids.forEach((asteroid, j) => {
          if (collision(asteroid, projectile)) {
            projectiles.splice(i, 1);
            this.asteroids.splice(j, 1);
            this.splitAsteroid(asteroid, elapsed);
          }
        });
      }
    }),
      this;
    if (this.ship.trigger && this.ship.loaded) {
      this.projectiles.push(this.ship.projectile(elapsed));
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    if (this.guide) {
      drawGrid({context: this.context});
      this.asteroids.forEach(asteroid => {
        drawLine(this.context, asteroid, this.ship);
        this.projectiles.forEach(projectile => {
          drawLine(this.context, asteroid, projectile);
        });
      }, this);
      this.fpsIndicator.drawScore(this.context, this.fps);
    }
    this.asteroids.forEach(asteroid => {
      asteroid.draw(this.context, this.guide);
    }, this);
    if (this.gameOver) {
      this.gameOverMessage.finalMessage(this.context, 'GAME OVER', 'Press space to play again');
      return;
    }
    this.ship.draw(this.context, this.guide);
    this.projectiles.forEach(projectile => {
      projectile.draw(this.context, this.guide);
    }, this);
    this.healhIndicator.drawHealth(this.context, this.ship.health, this.ship.maxHealth);
    this.scoreIndicator.drawScore(this.context, this.score);
    this.levelIndicator.drawScore(this.context, this.level);
  }

  splitAsteroid(asteroid, elapsed) {
    asteroid.mass -= this.massDestroyed;
    this.score += this.massDestroyed;
    const split = 0.25 + 0.5 * Math.random(); // split unevenly
    const char1 = asteroid.child(asteroid.mass * split);
    const char2 = asteroid.child(asteroid.mass * (1 - split));

    [char1, char2].forEach(child => {
      if (child.mass < this.massDestroyed) {
        this.score += child.mass;
      } else {
        this.pushAsteroid(child, elapsed);
        this.asteroids.push(child);
      }
    }, this);
  }

  levelUp() {
    this.level++;
    for (let i = 0; i < this.level; i++) {
      this.asteroids.push(this.movingAsteroid());
    }
  }
}
