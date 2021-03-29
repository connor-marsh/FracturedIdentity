function Player(x, y, img, keybinds) {
  
  this.img = new Image;
  this.img.src = img;
  this.w = 30;
  this.h = 60;
  this.left = false;
  this.right = false;
  this.jump = false;
  this.crouch = false;
  this.interact = false;
  this.acc = new Vector(0, 0);
  this.vel = new Vector(0, 0);
  this.pos = new Vector(x, y);
  this.ACC = 1.2;
  this.SPEED = 4;
  this.JUMP_POWER = 9;
  this.friction = new Vector(0, 0);
  this.interactables = [];
  this.grounded = false;
  this.keybinds = keybinds;

  this.update = function(plane) {
    
    // get all movement things
    if (this.left && this.grounded) {
      this.acc.x -= this.ACC;
    }
    else if (this.left) {
      this.vel.x -= this.ACC/8;
    }
    if (this.right && this.grounded) {
      this.acc.x += this.ACC;
    }
    else if (this.right) {
      this.vel.x += this.ACC/8;
    }
    if (this.jump && this.grounded) {
      this.vel.add(new Vector(0, -this.JUMP_POWER));
      this.grounded = false;
    }

    // friction
    if (this.grounded) {
      this.acc.add(zero.static_mult(this.friction, new Vector(-sign(this.vel.x), -sign(this.vel.y))))
    }

    this.acc.add(plane.gravity);
    
    this.vel.add(this.acc);
    this.vel.limitX(this.SPEED)
    this.acc.mult(zero);
    this.pos.add(this.vel);

    // Constrain player onto the screen (he can fall off the bottom though)
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }
    if (this.pos.x + this.w > width) {
      this.pos.x = width - this.w;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    }

    if (Math.abs(this.vel.x) > 1) {
      this.facing = this.vel.x;
    }
    if (this.vel.x < 1 && this.vel.x > -1 && this.vel.x != 0 && this.grounded) {
      this.vel.x = 0;
    }

    // reset properties that depend on collision before running collision
    this.interactables = [];
    //this.friction = zero;
    // collision
    this.grounded = false;
    for (object of plane.objects) {
      object.collision(this);
    }

    if (this.interact) {
      for (interactable of this.interactables) {
        interactable.interact(plane);
        this.interact = false;
      }
      
    }

  }

  // idk if this will be neccessary, right now its just present to prevent the game from calling a function that doesn't exist
  this.collision = function(a) {
    
  }

  this.draw = function() {
    ctx.save();
    if (this.facing < 0) {
      ctx.translate(this.pos.x, 0);
      ctx.scale(-1, 1);
      ctx.translate(-this.pos.x, 0);
      ctx.translate(-this.w, 0);
    }
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
    ctx.restore();
  }

  this.keydown = function(code) {
    if (code == this.keybinds[0]) {
      this.left = true;
    }
    else if (code == this.keybinds[1]) {
      this.right = true;
    }
    else if (code == this.keybinds[2]) {
      this.jump = true;
    }
    else if (code == this.keybinds[3]) {
      this.crouch = true;
    }
    else if (code == this.keybinds[4]) {
      this.interact = true;
    }
  }

  this.keyup = function(code) {
    if (code == this.keybinds[0]) {
      this.left = false;
    }
    else if (code == this.keybinds[1]) {
      this.right = false;
    }
    else if (code == this.keybinds[2]) {
      this.jump = false;
    }
    else if (code == this.keybinds[3]) {
      this.crouch = false;
    }
    else if (code == this.keybinds[4]) {
      this.interact = false;
    }
  }

}