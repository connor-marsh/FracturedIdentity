function Plane(player, objects, gravity, img, texts) {
  this.player = player;
  this.objects = objects;
  this.gravity = gravity;
  this.level;
  this.img = new Image();
  this.img.src = img;
  this.texts = texts;

  this.update = function() {
    this.player.update(this);
    // for (object of this.objects) {
    //   object.update();
    // }
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
    this.player.draw();

  }

}