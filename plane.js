function Plane(player, objects, gravity, img, texts) {
  this.player = player;
  this.objects = objects;
  this.objects.push(player); // Player is an object, this is useful for streamlining some collision code
  this.gravity = gravity;
  this.level;
  this.img = new Image();
  this.img.src = img;
  this.texts = texts;

  this.update = function() {
    for (object of this.objects) {
      object.update(this);
    }
  }

  this.draw = function() {


    // Draw background of plane
    ctx.drawImage(this.img, 0, 0, width, height);
    ctx.lineWeight = "5px";
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, width, height);

    for (let object of this.objects) {
      object.draw();
    }
    for (let text of this.texts) {
      text.draw();
    }

  }

}