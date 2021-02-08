function Button(x, y, w, h, onClick, bg, text) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.onClick = onClick;
  this.bg = bg;
  this.text = text;
  this.hovered = false;
  this.draw = function() {
    ctx.fillStyle = this.bg;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    if (this.hovered) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    ctx.save();
    ctx.translate(this.x + this.w/2, this.y + this.h/2);
    this.text.draw();
    ctx.restore();
  }
  this.isTouched = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
  }
}

/*if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
      return true;
    }
    return false;*/