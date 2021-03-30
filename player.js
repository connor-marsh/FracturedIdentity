function Player(x, y, img, keybinds) {
  this.img = img;
  this.animation = "Idle";
  this.idleFrames = 10;
  this.walkFrames = 6;
  this.pushFrames = 6;
  this.jumpFrames = 1;
  this.fallFrames = 1;
  this.animationFrame = 0;
  this.advanceFrame = 0;

  // preload the images (if the images were in a spritesheet I wouldn't have this problem
  // but with the current images and animations i have to do this)

  this.idleImages = [];
  for (let i = 0; i < this.idleFrames; i++) {
    this.idleImages.push(new Image());
    this.idleImages[i].src = this.img + "/Idle/Idle-" + (i+1) + ".png";
  }

  this.walkImages = [];
  for (let i = 0; i < this.walkFrames; i++) {
    this.walkImages.push(new Image());
    this.walkImages[i].src = this.img + "/Walking/Walking-" + (i+1) + ".png";
  }
  this.pushImages = [];
  for (let i = 0; i < this.pushFrames; i++) {
    this.pushImages.push(new Image());
    this.pushImages[i].src = this.img + "/Pushing/Pushing-" + (i+1) + ".png";
  }

  this.jumpImages = [];
  for (let i = 0; i < this.jumpFrames; i++) {
    this.jumpImages.push(new Image());
    this.jumpImages[i].src = this.img + "/Jumping/Jumping-" + (i+1) + ".png";
  }

  this.fallImages = [];
  for (let i = 0; i < this.fallFrames; i++) {
    this.fallImages.push(new Image());
    this.fallImages[i].src = this.img + "/Falling/Falling-" + (i+1) + ".png";
  }

  this.w = 30;
  this.h = 60;
  this.left = false;
  this.right = false;
  this.jump = false;
  this.crouch = false;
  this.interact = false;
  this.dead = false;
  this.acc = new Vector(0, 0);
  this.vel = new Vector(0, 0);
  this.pos = new Vector(x, y);
  this.ACC = 1.2;
  this.SPEED = 4;
  this.JUMP_POWER = 11;
  this.friction = new Vector(0, 0);
  this.interactables = [];
  this.grounded = false;
  this.keybinds = keybinds;

  this.update = function(plane) {
    
    if (this.dead) {
      screen = new DeadScreen();
      return;
    }
    
    var prevAnimation = this.animation;
    this.animation = "Idle";
    // get all movement things
    if (this.left && this.grounded) {
      this.acc.x -= this.ACC;
      this.animation = "Walking";
    }
    else if (this.left) {
      this.vel.x -= this.ACC/8;
    }
    if (this.right && this.grounded) {
      this.acc.x += this.ACC;
      this.animation = "Walking";
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

    if (this.pos.y > height) {
      this.dead = true;
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

    // After collision check if I'm rising or falling for animations
    if (this.vel.y < 0) {
      this.animation = "Jumping";
    }
    else if (this.vel.y > 2) {
      this.animation = "Falling";
    }

    if (this.interact) {
      for (interactable of this.interactables) {
        interactable.interact(plane);
        this.interact = false;
      }
      
    }

    if (this.animation != prevAnimation) {
      this.animationFrame = 0;
      this.advanceFrame = 0;
    }
    

  }

  // idk if this will be neccessary, right now its just present to prevent the game from calling a function that doesn't exist
  this.collision = function(a) {
    
  }

  this.draw = function() {
    // console.log(this.animation);
    ctx.save();
    if (this.facing < 0) {
      ctx.translate(this.pos.x, 0);
      ctx.scale(-1, 1);
      ctx.translate(-this.pos.x, 0);
      ctx.translate(-this.w, 0);
    }
    // I like this code, its super near but because of image loading times the images flicker on screen
    // this.frame = new Image();
    // this.frame.src = this.img + "/" + this.animation + "/" + this.animation + "-" + this.animationFrame + ".png";
    
    

    
    // console.log(this.animation);
    // console.log(this.idleImages[this.animationFrame].src);
    switch (this.animation) {
      case "Idle":
        if (this.animationFrame == this.idleFrames) {
          this.animationFrame = 0;
        }
        ctx.drawImage(this.idleImages[this.animationFrame], this.pos.x, this.pos.y, this.w, this.h);
        break;
      case "Walking":
        if (this.animationFrame == this.walkFrames) {
          this.animationFrame = 0;
        }
        ctx.drawImage(this.walkImages[this.animationFrame], this.pos.x, this.pos.y, this.w, this.h);
        break;
      case "Pushing":
        if (this.animationFrame == this.pushFrames) {
          this.animationFrame = 0;
        }
        ctx.drawImage(this.pushImages[this.animationFrame], this.pos.x, this.pos.y, this.w, this.h);
        break;
      case "Jumping":
        if (this.animationFrame == this.jumpFrames) {
          this.animationFrame = 0;
        }
        ctx.drawImage(this.jumpImages[this.animationFrame], this.pos.x, this.pos.y, this.w, this.h);
        break;
      case "Falling":
        if (this.animationFrame == this.fallFrames) {
          this.animationFrame = 0;
        }
        ctx.drawImage(this.fallImages[this.animationFrame], this.pos.x, this.pos.y, this.w, this.h);
        break;
    }
    ctx.restore();

    this.advanceFrame++;
    if (this.advanceFrame % 5 == 0) {
      this.animationFrame++;
    }
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