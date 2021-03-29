class Object {
  constructor(x, y, w, h, bg) {
    this.pos = new Vector(x, y);
    this.w = w;
    this.h = h;
    this.bg = bg;
  }

  update(plane) {

  }

  draw() {
    ctx.fillStyle = this.bg;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  }

  collision(a) {
    return (a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w && a.pos.y + a.h > this.pos.y && a.pos.y < this.pos.y + this.h);
  }

}

class Stage extends Object {
  constructor(x, y, w, h, bg, friction) {
    super(x, y, w, h, bg);
    this.friction = friction;
  }

  collision(a) {
    // a is a moveable object or a player
    // top side
    if (a.pos.y + a.h > this.pos.y && a.pos.y + a.h < this.pos.y + 1 + a.vel.y && a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w) {
      a.grounded = true;
      a.friction = this.friction;
      a.vel.y = 0;
      a.pos.y = this.pos.y - a.h;
    }
    // bottom side
    if (a.pos.y < this.pos.y + this.h && a.pos.y > this.pos.y + this.h - 1 + a.vel.y && a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w) {
      a.vel.y = 1;
      a.pos.y = this.pos.y + this.h;
    }
    // right side
    if (a.pos.x < this.pos.x + this.w && a.pos.x > this.pos.x + this.w + a.vel.x - 1 && a.pos.y < this.pos.y + this.h && a.pos.y + a.h > this.pos.y) {
      a.vel.x = 0;
      a.pos.x = this.pos.x + this.w;
    }
    // left side
    if (a.pos.x + a.w > this.pos.x && a.pos.x + a.w < this.pos.x + a.vel.x + 1 && a.pos.y < this.pos.y + this.h && a.pos.y + a.h > this.pos.y) {
      a.vel.x = 0;
      a.pos.x = this.pos.x - a.w;
    }
  }

}

class Default extends Stage {
  constructor(x, y, w, h) {
    super(x, y, w, h, "gray", new Vector(1, 0));
  }
}

class PhasedStage extends Stage {
  constructor(x, y, w, h, bg, friction, linkId) {
    super(x, y, w, h, bg, friction);
    this.linkId = linkId; // Used to connect it to the phase lever
    this.phased = false;

  }

  collision(a) {
    if (!this.phased) {
      super.collision(a);
    }
  }

  draw() {
    super.draw();
    if (this.phased) {
      ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
      ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    }
  }

}

class PhasedIn extends PhasedStage {
  constructor(x, y, w, h, linkId) {
    super(x, y, w, h, "gray", new Vector(1, 0), linkId);
  }
}

class PhasedOut extends PhasedStage {
  constructor(x, y, w, h, linkId) {
    super(x, y, w, h, "gray", new Vector(1, 0), linkId);
    this.phased = true;
  }
}

class Platform extends Object {

  constructor(x, y, w, h, img, friction) {
    super(x, y, w, h, "grey"); //give the object constructor a bg temporarily until everything uses images
    this.img = new Image();
    this.img.src = img; // fix this when i change stage to images
    this.friction = friction;
  }

  draw() {

    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);

  }

  collision(a) {
    if (!a.crouch) { // crouch to fall through platforms
      if (a.pos.y + a.h > this.pos.y && a.pos.y + a.h < this.pos.y + 1 + a.vel.y && a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w) {
        a.grounded = true;
        a.friction = this.friction;
        a.vel.y = 0;
        a.pos.y = this.pos.y - a.h;
      }
    }
  }

}

class PlatFault extends Platform {
  constructor(x, y, w) {
    super(x, y, w, 5, "Assets/platform.png", new Vector(1, 0));
  }
}

class Desk extends Platform {
  constructor(x, y) {
    super(x, y - 18, 46, 18, "Assets/desk.png", new Vector(1, 0));
  }
}

class Shelf extends Platform {
  constructor(x, y) {
    super(x, y - 65, 42, 65, "Assets/shelf of flasks.png", new Vector(1, 0));
  }
}

class Interactable extends Object {

  constructor(x, y, w, h, img) {
    super(x, y, w, h, "orange");
    this.img = new Image();
    this.img.src = img;
    this.touchingPlayer = false;
  }

  collision(a) {

    if (typeof (a.interactables) != "undefined") {

      if (super.collision(a)) {
        a.interactables.push(this);
        this.touchingPlayer = true;
      }
      else {
        this.touchingPlayer = false;
      }
    }
  }

  draw() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
    if (this.touchingPlayer) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h);
    }
  }

  // Interact method should always have (plane) as parameter because that will match the call in player.update

}

class Goal extends Interactable {

  constructor(x, y) {
    super(x, y - 80, 40, 80, "Assets/goal.png");
  }

  interact(plane) {
    plane.level.complete();
  }
}

class PlaneSwitch extends Interactable {

  constructor(x, y) {
    super(x, y - 55 - 40, 20, 40, "Assets/planeSwitch.png");
  }

  interact(plane) {
    plane.level.front1 = !plane.level.front1;
  }

}

class PhaseLever extends Interactable {

  constructor(x, y, linkId) {
    super(x, y - 20, 20, 20, "Assets/phaseLever.png");
    this.bg = "red";
    this.linkId = linkId; // This is the ID of the object in the plane's array of objects
    this.phased = false;
  }

  interact(plane) {
    var linkedObjects = [];
    for (object of plane.level.plane1.objects) {
      if (object.linkId == this.linkId && typeof (object.phased) == "boolean") {
        linkedObjects.push(object);
      }
    }
    for (object of plane.level.plane2.objects) {
      if (object.linkId == this.linkId && typeof (object.phased) == "boolean") {
        linkedObjects.push(object);
      }
    }
    for (let i = 0; i < linkedObjects.length; i++) {
      linkedObjects[i].phased = !linkedObjects[i].phased;
    }
  }

  draw() {
    ctx.drawImage(this.img, this.phased ? this.w : 0, 0, this.w, this.h, this.pos.x, this.pos.y, this.w, this.h);
    if (this.touchingPlayer) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h);
    }
  }
}

// Will interact with all of its linked objects
class TimerSwitch extends Interactable {

  constructor(x, y, linkedObjects, time) {
    super(x, y, 20, 20, "Assets/flask.png");
    this.time = time * fps;
    this.timeLeft = this.time;
    this.on = true;

    this.linkedObjects = linkedObjects;
  }

  update(plane) {

    if (this.on) {

      this.timeLeft--;

      if (this.timeLeft == 0) {
        for (let i = 0; i < this.linkedObjects.length; i++) {
          this.linkedObjects[i].interact(plane);
        }
        this.timeLeft = this.time;
      }
    }
  }

  interact(plane) {
    this.on = !this.on;
  }



}

class PressurePlate extends Object {

  constructor(x, y, linkId) {
    super(x, y - 12, 30, 12, "pink");
    this.linkId = linkId;
    this.pressed = false;
  }

  update(plane) {
    var beenPressed = false;
    for (object of plane.objects) {
      if (this.collision(object) && object != this) {
        beenPressed = true;
      }
    }

    if (beenPressed != this.pressed) {
      var linkedObjects = [];
      for (object of plane.level.plane1.objects) {
        if (object.linkId == this.linkId && typeof (object.phased) == "boolean") {
          linkedObjects.push(object);
        }
      }
      for (object of plane.level.plane2.objects) {
        if (object.linkId == this.linkId && typeof (object.phased) == "boolean") {
          linkedObjects.push(object);
        }
      }
      for (let i = 0; i < linkedObjects.length; i++) {
        linkedObjects[i].phased = !linkedObjects[i].phased;
      }
      this.pressed = beenPressed;
    }

  }

}

class Barrel extends Default {

  constructor(x, y) {
    super(x, y - 28, 18, 28, "Assets/barrel.png");
    this.img = new Image();
    this.img.src = "Assets/barrel.png";
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.grounded = false;
  }

  update(plane) {

    // this.grounded = false;
    // for (object of plane.objects) {
    //   object.collision(this);
    // }

    // friction
    if (this.grounded) {
      this.acc.add(zero.static_mult(this.friction, new Vector(-sign(this.vel.x), -sign(this.vel.y))))
    }

    this.acc.add(plane.gravity);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(zero);

    // Constrain barrel onto the screen (they can fall off the bottom though)
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


    if (this.vel.x < 1 && this.vel.x > -1 && this.vel.x != 0 && this.grounded) {
      this.vel.x = 0;
    }

    this.grounded = false;
    for (object of plane.objects) {
      object.collision(this);
    }
    

  }

  // I would love to have this inherit from the Stage collision somehow but I'm not sure how to efficiently do that while letting it move
  collision(a) {
    if (a == this) {return;}
    // a is a moveable object or a player
    // top side
    if (a.pos.y + a.h > this.pos.y && a.pos.y + a.h < this.pos.y + 1 + a.vel.y && a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w) {
      a.grounded = true;
      a.friction = this.friction;
      a.vel.y = 0;
      a.pos.y = this.pos.y - a.h;
    }
    // bottom side
    if (a.pos.y < this.pos.y + this.h && a.pos.y > this.pos.y + this.h - 1 + a.vel.y && a.pos.x + a.w > this.pos.x && a.pos.x < this.pos.x + this.w) {
      a.vel.y = 1;
      a.pos.y = this.pos.y + this.h;
    }
    // right side
    if (a.pos.x < this.pos.x + this.w && a.pos.x > this.pos.x + this.w + a.vel.x - 10 && a.pos.y < this.pos.y + this.h && a.pos.y + a.h > this.pos.y) {
      this.vel.x = a.vel.x;
      a.pos.x = this.pos.x + this.w;
    }
    // left side
    if (a.pos.x + a.w > this.pos.x && a.pos.x + a.w < this.pos.x + a.vel.x + 10 && a.pos.y < this.pos.y + this.h && a.pos.y + a.h > this.pos.y) {
      this.vel.x = a.vel.x;
      a.pos.x = this.pos.x - a.w;
    }
  }

  draw() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
  }

}