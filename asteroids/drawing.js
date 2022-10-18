function drawGrid({context, minor, major, stroke, fill}) {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || '#00FF00';
  fill = fill || '#009900';
  context.save();
  context.strokeStyle = stroke;
  context.fillStyle = fill;
  const width = context.canvas.width;
  const height = context.canvas.height;
  for (let x = 0; x < width; x += minor) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.lineWidth = x % major === 0 ? 0.5 : 0.25;
    context.stroke();
    if (x % major === 0) context.fillText(x, x, 10);
  }

  for (let y = 0; y < height; y += minor) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.lineWidth = y % major === 0 ? 0.5 : 0.25;
    context.stroke();
    if (y % major === 0) context.fillText(y, 0, y + 10);
  }
  context.restore();
}

function drawPacman({context, x, y, radius, mouthAngle}) {
  mouthAngle = mouthAngle != undefined ? mouthAngle : 1;
  radius = radius || 100;
  const angle = 0.2 * Math.PI * mouthAngle;
  context.save();
  context.fillStyle = 'yellow';
  context.strokeStyle = 'black';
  context.lineWidth = 0.5;
  context.beginPath();
  context.arc(0, 0, radius, angle, -angle);
  context.lineTo(0, 0);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
}

function drawShip({context, radius, options = {}}) {
  const curve1 = options.curve1 || 0.25;
  const curve2 = options.curve2 || 0.75;
  const angle = (options.angle || 0.5 * Math.PI) / 2;
  context.save();
  // optionally draw a guide showing the collision radius
  if (options.guide) {
    context.strokeStyle = 'white';
    context.fillStyle = 'rgba(0,0,0,0.25)';
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }

  if (options.thruster) {
    context.save();
    context.strokeStyle = 'yellow';
    context.fillStyle = 'red';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo((Math.cos(Math.PI + angle * 0.9) * radius) / 2, (Math.sin(Math.PI + angle * 0.8) * radius) / 2);
    context.quadraticCurveTo(
      -radius * 2,
      0,
      (Math.cos(Math.PI - angle * 0.8) * radius) / 2,
      (Math.sin(Math.PI - angle * 0.8) * radius) / 2,
    );
    context.fill();
    context.stroke();
    context.restore();
  }

  // set some default values
  context.lineWidth = options.lineWidth || 2;
  context.strokeStyle = options.stroke || 'white';
  context.fillStyle = options.fill || 'black';
  // draw the ship in three lines
  context.beginPath();
  context.moveTo(radius, 0);
  context.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius,
  );
  context.quadraticCurveTo(-radius * curve1, 0, Math.cos(Math.PI + angle) * radius, Math.sin(Math.PI + angle) * radius);
  context.quadraticCurveTo(Math.cos(-angle) * radius * curve2, Math.sin(-angle) * radius * curve2, radius, 0);
  context.fill();
  context.stroke();
  if (options.guide) {
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
    context.lineTo(0, 0);
    context.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    context.moveTo(-radius, 0);
    context.lineTo(0, 0);
    context.stroke();
    context.beginPath();
    context.arc(Math.cos(angle) * radius * curve2, Math.sin(angle) * radius * curve2, radius / 40, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(Math.cos(-angle) * radius * curve2, Math.sin(-angle) * radius * curve2, radius / 40, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
    context.fill();
  }
  context.restore();
}

function drawAsteroid({context, radius, shape, options = {}}) {
  context.strokeStyle = options.stroke || 'white';
  context.fillStyle = options.fill || 'black';
  context.lineWidth = options.lineWidth || 1;
  context.save();
  context.beginPath();
  for (let i = 0; i < shape.length; i++) {
    context.rotate((2 * Math.PI) / shape.length);
    context.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  context.closePath();
  context.fill();
  context.stroke();

  if (options.guide) {
    // inner circle
    context.lineWidth = 0.7;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.stroke();
    // outer circle
    context.lineWidth = 0.3;
    context.beginPath();
    context.arc(0, 0, radius + radius * options.noise, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius - radius * options.noise, 0, 2 * Math.PI);
    context.stroke();
  }
  context.restore();
}

function drawGhost({context, radius, options = {}}) {
  let feet = options.feet || 4;
  let headRadius = radius * 0.8;
  let footRadius = headRadius / feet;
  context.save();
  context.strokeStyle = options.stroke || 'white';
  context.fillStyle = options.fill || 'red';
  context.lineWidth = options.lineWidth || radius * 0.05;
  context.beginPath();
  for (foot = 0; foot < feet; foot++) {
    context.arc(2 * footRadius * (feet - foot) - headRadius - footRadius, radius - footRadius, footRadius, 0, Math.PI);
  }
  context.lineTo(-headRadius, radius - footRadius);
  context.arc(0, headRadius - radius, headRadius, Math.PI, 2 * Math.PI);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
}

function drawProjectile({context, radius, life}) {
  context.save();
  context.fillStyle = `rgb(100%,100%,${100 * life}%)`;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fill();
  context.restore();
}

function drawLine(context, obj1, obj2) {
  context.save();
  context.strokeStyle = 'white';
  context.lineWidth = 0.5;
  context.beginPath();
  context.moveTo(obj1.x, obj1.y);
  context.lineTo(obj2.x, obj2.y);
  context.stroke();
  context.restore();
}
