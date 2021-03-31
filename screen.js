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
  mouseup(x, y, prevX, prevY) {
    super.mouseup(x, y, prevX, prevY);
    if (mouseControls) {
    if (x < 500) {
      if (this.level.front1) {
        this.level.plane1.player.left = !this.level.plane1.player.left;
      }
      else {
        this.level.plane2.player.left = !this.level.plane2.player.left;
      }
    }
    if (x > 900) {
      if (this.level.front1) {
        this.level.plane1.player.right = !this.level.plane1.player.right; 
      }
      else {
        this.level.plane2.player.right = !this.level.plane2.player.right;
      }
    }
    if (y < 250) {
      if (this.level.front1) {
        this.level.plane1.player.jump = !this.level.plane1.player.jump;
      }
      else {
        this.level.plane2.player.jump = !this.level.plane2.player.jump;
      }
    }
    if (y > 600) {
      if (this.level.front1) {
        this.level.plane1.player.crouch = !this.level.plane1.player.crouch;
      }
      else {
        this.level.plane2.player.crouch = !this.level.plane2.player.crouch;
      }
    }
    if (x > 500 && x < 900 && y > 250 && y < 600) {
      if (this.level.front1) {
        this.level.plane1.player.interact = !this.level.plane1.player.interact;
      }
      else {
        this.level.plane2.player.interact = !this.level.plane2.player.interact;
      }
    }
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

class StoryScreen extends Screen {

  constructor() {
    super([new Text(1000, 600, 20, "Click anywhere to continue...")], [new Button(20, 20, 70, 50, function(){screen=levelSelect}, "orange", new Text(0, 0, 10, "Skip Intro"))], "Assets/plane2Background.png");
    // this is all really dumb code to control how the screen advances and is blurred
    this.blurTotal = 50;
    this.blurCount = this.blurTotal-1;
    this.blurDir = 1;
    this.slide = 0;
    this.slides = [[]];
    this.nextSlide = true;
    this.slides.push([new Text(700, 100, 20, "Greetings, agent. What follows is your mission debrief:"), new Text(700, 140, 20, "Listen closely, as the stakes of this mission are steep."), new Text(700, 180, 20, "I take it you’ve heard about the appalling experiments that have taken place inside laboratory 243-08."), new Text(700, 220, 20, "If you aren’t familiar, all you need to know is this:"), new Text(700, 260, 20, "one careless mistake or oversight by an experiment operator could set off a"), new Text(700, 300, 20, "serious chain reaction that would bring about the end of humanity as we know it."), new Text(700, 340, 20, "Even those that aren’t located in the immediate radius of a potential blast"), new Text(700, 380, 20, "will soon be subject to widespread poisoning of food and water."), new Text(700, 420, 20, "And even now, the conditions inside the lab are unstable at best; disaster seems inevitable.")]);
    

    this.slides.push([new Text(700, 100, 20, "I happen to know something of your unusual circumstances, which I’ll briefly go over for sake of routine."), new Text(700, 140, 20, "As a result of events I don’t have time to explain,"), new Text(700, 180, 20, "you have two separate bodies at your disposal; they share this consciousness."), new Text(700, 220, 20, "Don’t ask me how that’s possible, not even I have the slightest clue as to the science behind it."), new Text(700, 260, 20, "The only way you can transfer your mind between your two bodies"), new Text(700, 300, 20, "is via special neuralyzers that have been planted inside the lab."), new Text(700, 340, 20, "Use this to the best of your ability, because as you probably know,"), new Text(700, 380, 20, "this unique ability of yours is the very reason you have been selected for such a dire assignment.")])

    this.slides.push([new Text(700, 100, 20, "Your objective for this mission is to secure the lab."), new Text(700, 140, 20, "For obvious reasons, the lab has been evacuated;"), new Text(700, 180, 20, "all you need to do is make your way through it unscathed. Once you emerge from the other side,"), new Text(700, 220, 20, "we will finally be able to disable the lab up from the inside, and deter imminent disaster."), new Text(900, 400, 30, "Good luck.")]);
  }

  draw() {
    
    ctx.drawImage(this.img, 0, 0, width, height);
    for (let text of this.slides[this.slide]) {
      text.draw();
    }

    for (let text of this.texts) {
      text.draw();
    }

    for (let button of this.buttons) {
      button.draw();
    }

    if (this.nextSlide) {
      this.blurCount += this.blurDir;
      if (this.blurCount >= this.blurTotal) {
        this.blurDir = -1;
        this.slide++;
        // if you reached end of story then exit
        if (this.slide == this.slides.length) {
          screen = levelSelect;
          return;
        }
      }
      if (this.blurCount == 0) {
        this.nextSlide = false;
        
      }
      ctx.fillStyle = "rgba(200, 200, 200, " + this.blurCount * (1/this.blurTotal) + ")";
      ctx.fillRect(0, 0, width, height);
    }

  }

  mouseup(x, y, prevX, prevY) {
    
    for (let button of this.buttons) {
      if (button.isTouched(x, y)) {
        button.onClick();
      }
    }
    
    if (this.blurCount == 0) {
      this.nextSlide = true;
      this.blurDir = 1;
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