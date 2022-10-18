class Indicator {
  constructor(label, x, y, width, height, options = {}) {
    this.label = label + ': ';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.digits = options.digits || 0;
    this.pt = options.pt || 10;
    this.align = options.align || 'end';
    this.mainPt = options.mainPt || 28;
    this.subPt = options.subPt || 18;
    this.fill = options.fillStyle || 'white';
    this.textAlign = options.textAlign || 'center';
  }

  drawHealth(context, max, level) {
    context.save();
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.font = this.height + 'px Arial';
    const offset = context.measureText(this.label).width;
    context.fillText(this.label, this.x, this.y + this.height - 1);
    context.beginPath();
    context.rect(offset + this.x, this.y, this.width, this.height);
    context.stroke();
    context.beginPath();
    context.rect(offset + this.x, this.y, this.width * (max / level), this.height);
    context.fill();
    context.restore();
  }

  drawScore(context, value) {
    context.save();
    context.fillStyle = 'white';
    context.font = this.pt + 'px Arial';
    context.textAlign = this.align;
    context.fillText(this.label + value.toFixed(this.digits), this.x, this.y + this.pt - 1);
    context.restore();
  }

  finalMessage(context, main, sub) {
    context.save();
    context.fillStyle = this.fill;
    context.textAlign = this.textAlign;
    context.font = this.mainPt + 'px Arial';
    context.fillText(main, this.x, this.y);
    context.font = this.subPt + 'px Arial';
    context.fillText(sub, this.x, this.y + this.subPt);
    context.restore();
  }
}
