class Screen {
  constructor(texts, buttons, img) {
    this.texts = texts;
    this.buttons = buttons;
    this.img = new Image();
    this.img.src = img;
  }
  update() {
    

  }
  draw() {
    
    ctx.drawImage(this.img, 0, 0, width, height);
    for (let text of this.texts) {
      text.draw();
    }
    for (let button of this.buttons) {
      button.draw();
    }

  }

  mousemove(x, y) {
    for (let button of this.buttons) {
      button.hovered = button.isTouched(x, y);
    }
  }

  mouseup(x, y, prevX, prevY) {
    for (let button of this.buttons) {
      if (button.isTouched(x, y)) {
        button.onClick();
      }
    }
  }

}

class LevelScreen extends Screen {
  constructor(text, buttons) {
    super([], [new Button(10, 10, 40, 30, function(){screen=new PauseScreen();}, "orange", new Text(0, 0, 10, "Pause"))], "Assets/plane1Background.png")
    this.level;
  }
  update() {
    super.update();
    this.level.update();
  }
  draw() {
    
    this.level.draw();
    for (let button of this.buttons) {
      button.draw();
    }
    for (let text of this.texts) {
      text.draw();
    }
    
  }
}

class PauseScreen extends Screen {

  constructor() {
    super([new Text(width/2, 100, 30, "Paused")], [new Button(width/2-300, height/2-30-100, 100, 60, function(){screen=levelScreen; levelScreen.level = levels[levelScreen.level.levelNum].gen()}, "orange", new Text(0, 0, 14, "Restart")), new Button(width/2-50, height/2-30-80, 100, 60, function(){screen=levelScreen}, "orange", new Text(0, 0, 14, "Resume")), new Button(width/2-50, height/2-30, 100, 60, function(){screen=levelSelect}, "orange", new Text(0, 0, 14, "Level Select")), new Button(width/2-50, height/2-30 + 80, 100, 60, function(){screen=homeScreen}, "orange", new Text(0, 0, 14, "Home Screen"))], "Assets/plane1Background.png");
    this.firstFrame = true;
  }

  draw() {

    if (this.firstFrame) {
      // blur out the game screen on the first rendered frame of the pause screen
      ctx.fillStyle = "rgba(100, 100, 100, 0.2)"
      ctx.fillRect(0, 0, width, height);
      this.firstFrame = false;
    }
    // translate and scale to middle to make image look nice
    ctx.save();
    ctx.translate(width/4, height/4);
    ctx.scale(0.5, 0.5);
    //ctx.drawImage(this.img, 0, 0, width, height);
    //****** THIS IS JUST FILLER UNTIL I HAVE AN IMAGE FOR PAUSE SCREEN
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(width/4, height/4, width*2/4, height*2/4);
    for (let button of this.buttons) {
      button.draw();
    }
    for (let text of this.texts) {
      text.draw();
    }

  }

}

class DeadScreen extends Screen {

  constructor() {
    super([new Text(width/2, 100, 30, "You died...")], [new Button(width/2-50, height/2-30-80, 100, 60, function(){screen=levelScreen; levelScreen.level = levels[levelScreen.level.levelNum].gen()}, "orange", new Text(0, 0, 14, "Retry")), new Button(width/2-50, height/2-30, 100, 60, function(){screen=levelSelect}, "orange", new Text(0, 0, 14, "Level Select")), new Button(width/2-50, height/2-30 + 80, 100, 60, function(){screen=homeScreen}, "orange", new Text(0, 0, 14, "Home Screen"))], "Assets/plane1Background.png");
    this.firstFrame = true;
  }

  draw() {

    if (this.firstFrame) {
      // blur out the game screen on the first rendered frame of the pause screen
      ctx.fillStyle = "rgba(100, 100, 100, 0.2)"
      ctx.fillRect(0, 0, width, height);
      this.firstFrame = false;
    }
    // translate and scale to middle to make image look nice
    ctx.save();
    ctx.translate(width/4, height/4);
    ctx.scale(0.5, 0.5);
    //ctx.drawImage(this.img, 0, 0, width, height);
    //****** THIS IS JUST FILLER UNTIL I HAVE AN IMAGE FOR PAUSE SCREEN
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(width/4, height/4, width*2/4, height*2/4);
    for (let button of this.buttons) {
      button.draw();
    }
    for (let text of this.texts) {
      text.draw();
    }

  }

}

function Text(x, y, size, text) {
  this.x = x;
  this.y = y;
  this.bg = "black";
  this.text = text;

  this.draw = function() {
    ctx.font = size+"px Potta One";
    ctx.fillStyle = this.bg;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
  }
}