/*
Sample level
{
    gen: function () {
      var objects1 = [];
      var objects2 = [];
      var texts1 = [];
      var texts2 = [];
      var plane1 = new Plane(new Player(0, 0, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(0, 0, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2);
    }
*/



var levels = [
  {
    // ******** level 0
    //this is testing and meming level
    gen: function () {
      var levelNum = 0;

      var objects1 = [new Default(50, 500, 400, 200, "green", new Vector(1, 0)), new PhasedIn(450, 520, 240, 100, 0), new PlaneSwitch(80, 500), new Desk(300, 500), new Shelf(240, 500), new TimerSwitch(100, 450, [], 2), new PressurePlate(350, 500, 0), new Puddle(500, 520)];
      var objects2 = [new Default(50, 200, 400, 100, "green", new Vector(1, 0)), new Default(150, 170, 40, 30),  new Barrel(300, 200), new Barrel(350, 200), new Default(460, 500, 300, 50, "green", new Vector(1, 0)), new PlaneSwitch(80, 200), new PlaneSwitch(560, 500), new Platform(470, 400, 100, 5, "Assets/platform.png", new Vector(1, 0)), new PressurePlate(550, 500, 0), new Barrel(600, 500), new PhaseLever(700, 500, 0)];
      objects1[5].linkedObjects.push(objects2[objects2.length-1]);
      var texts1 = [];
      var texts2 = [];
      var plane1 = new Plane(new Player(100, 100, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 100, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, .7), "Assets/plane2Background.png", texts2);
      
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 1;
      var objects1 = [new Default(0, 630, 400, 100), new Default(400, 580, 1000, 120), new Desk(600, 580), new Shelf(660, 580), new PlaneSwitch(1300, 580)];
      var objects2 = [new Default(0, 600, 1400, 100), new PlaneSwitch(80, 600), new Goal(300, 600)];

      var texts1 = [new Text(150, 500, 15, "Left Arrow to move left"), new Text(150, 530, 15, "Right Arrow to move right"), new Text(400, 500, 15, "Up Arrow to jump"), new Text(650, 430, 15, "Down Arrow to fall through"), new Text(650, 460, 15, "Furniture items and platforms"), new Text(1100, 400, 15, "Press Period (.) to interact with objects when they are highlighted"), new Text(1100, 430, 15, "Interacting with this neuralyzer will send your conscious"), new Text(1100, 460, 15, "to a different plane and a different body")];
      var texts2 = [new Text(width / 2, 300, 30, "Now enter the capsule (and press .) to go to the next lab!")];

      var plane1 = new Plane(new Player(100, 540, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 100, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 2;
      var objects1 = [new Default(0, 600, 1400, 100), new Shelf(20, 600), new Desk(100, 600), new PhaseLever(200, 600, 0), new PhasedIn(250, 400, 100, 200, 0), new Desk(550, 600), new Shelf(830, 600), new PlaneSwitch(900, 600), new PhaseLever(1000, 600, 1), new PhasedIn(1100, 400, 100, 200, 2), new PhaseLever(1300, 600, 3)];
      var objects2 = [new Default(0, 600, 1400, 100), new PlaneSwitch(100, 600), new PhasedIn(250, 400, 100, 200, 1), new PlaneSwitch(450, 600), new Desk(430, 600), new PhaseLever(550, 600, 2), new PhasedIn(600, 400, 100, 200, 3), new Goal(1000, 600), new Shelf(1200, 600), new Shelf(1242, 600), new Shelf(1284, 600), new Shelf(1326, 600)];
      var texts1 = [new Text(300, 300, 15, "There's a wall blocking your path!"), new Text(300, 330, 15, "Pull this lever to phase it out of existence"), new Text(300, 360, 15, "All phase levers have one or more objects they are linked to"), new Text(300, 390, 15, "and that lever will control if the objects are phased in or out"), new Text(600, 500, 15, "Look at the image on the top right"), new Text(600, 530, 15, "to see a miniature version of the other plane")];
      var texts2 = [new Text(500, 350, 15, "Phase levers can be linked to objects on different planes")];
      var plane1 = new Plane(new Player(100, 540, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 540, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 3;
      var objects1 = [new Default(0, 600, 1400, 100), new Default(0, 100, 400, 100), new PlaneSwitch(550, 100), new PhasedIn(400, 100, 300, 100, 0), new Default(600, 0, 100, 100), new Default(700, 0, 100, 500), new Default(1300, 600, 100, 100), new Default(400, 300, 300, 100), new PlaneSwitch(650, 300), new PhasedIn(200, 300, 200, 90, 0), new Default(100, 300, 100, 100), new PhaseLever(150, 300, 1), new Default(200, 390, 200, 10, 0), new PhasedOut(100, 400, 100, 200, 1), new PlaneSwitch(250, 600), new PhasedIn(300, 400, 100, 200, 1), new PhasedOut(500, 400, 100, 200, 1), new PlaneSwitch(450, 600), new PhasedIn(700, 400, 100, 200, 0), new Goal(1330, 600)];
      var objects2 = [new Default(0, 100, 400, 100), new PlaneSwitch(100, 100), new PhaseLever(200, 100, 0), new PhasedIn(250, 0, 20, 100, 1), new PhaseLever(290, 100, 1), new PlaneSwitch(340, 100)];
      var texts1 = [new Text(200, 30, 15, "Alright have fun with this level..."), new Text(200, 230, 15, "If you get stuck you can"), new Text(200, 260, 15, "press pause and then restart"), new Text(1100, 550, 15, "Hey you made it! Took you long enough")];
      var texts2 = [new Text(width/2, height/2, 15, "Note that some objects can have their phase inverted, or in other words they are phased out when the phase lever is off and vice versa.")];
      var plane1 = new Plane(new Player(100, 40, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 40, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 4;
      var objects1 = [new Default(0, 200, 600, 200), new Barrel(130, 200), new Default(300, 100, 100, 100), new Barrel(500, 200), new Default(625, 500, 775, 200), new PressurePlate(1000, 500, 0), new PlaneSwitch(1200, 500)];
      var objects2 = [new Default(0, 500, 1400, 200), new PhasedIn(200, 400, 50, 100, 0), new Puddle(500, 500), new Goal(800, 500), new PlaneSwitch(100, 500)];
      var texts1 = [new Text(200, 75, 15, "Barrels can be moved and jumped on"), new Text(900, 400, 15, "Pressure plates can phase objects when pressed")];
      var texts2 = [new Text(500, 400, 15, "Toxic Sludge will melt you instantly")];
      var plane1 = new Plane(new Player(50, 140, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 440, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 5;
      var objects1 = [new Default(0, 500, 1400, 200), new Shelf(200, 500), new Shelf(200, 435), new Shelf(200, 370), new Shelf(200, 305), new Shelf(158, 500), new Shelf(158, 435), new Shelf(158, 370), new Shelf(158, 305), new Shelf(158, 240), new Shelf(200, 240), new Default(275, 225, 100, 25), new Barrel(325, 225), new Default(275, 100, 100, 25), new Barrel(325, 100), new Default(275, 350, 100, 25), new Barrel(325, 350), new Puddle(800, 500), new Puddle(830, 500), new Puddle(860, 500),new Puddle(890, 500), new Puddle(920, 500), new Goal(1100, 500)];
      var objects2 = [new Default(0, 500, 1400, 200)];
      var texts1 = [new Text(800, 300, 15, "Not every lab requires you to use both bodies!")];
      var texts2 = [];
      var plane1 = new Plane(new Player(50, 440, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 440, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  },
  {
    gen: function () {
      var levelNum = 6;
      var objects1 = [new Default(0, 500, 1400, 200), new Shelf(200, 500), new Shelf(200, 435), new Shelf(200, 370), new Shelf(200, 305), new Shelf(158, 500), new Shelf(158, 435), new Shelf(158, 370), new Shelf(158, 305), new Shelf(158, 240), new Shelf(200, 240), new Default(275, 225, 100, 25), new Barrel(325, 225), new Barrel(350, 225), new Default(275, 100, 100, 25), new Barrel(325, 100), new Barrel(350, 100), new Default(275, 350, 100, 25), new Barrel(325, 350), new Barrel(350, 350), new Default(500, 325, 100, 25), new PressurePlate(550, 325, 0), new PlaneSwitch(900, 500)];
      var objects2 = [new PlaneSwitch(100, 500), new Default(0, 500, 1400, 200), new PhasedIn(200, 400, 50, 100, 0), new Goal(700, 500), new PhaseLever(900, 500, 1), new Default(300, 450, 50, 50), new PhasedIn(350, 450, 125, 25, 1), new Puddle(350, 500), new Puddle(380, 500), new Puddle(410, 500), new Default(475, 450, 50, 50)];
      objects2.push(new TimerSwitch(800, 475, [objects2[4]], 1));
      var texts1 = [new Text(600, 100, 15, "A twist on the previous lab"), new Text(600, 140, 15, "Try stacking barrels")];
      var texts2 = [new Text(700, 300, 15, "Timer switches can power on and off anything at a set interval"), new Text(700, 340, 15, "You can also shut them off by interacting with them except this one is out of reach")];
      var plane1 = new Plane(new Player(50, 440, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 440, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  }
];
// This is the final level to prevent people from over playing unless I add a game ending sequence
levels.push({
    gen: function () {
      var levelNum = levels.length;
      var objects1 = [new Default(0, 600, 1400, 100)];
      var objects2 = [new Default(0, 600, 1400, 100)];
      var texts1 = [new Text(width/2, height/2, 15, "That's all the levels that have been developed so far. More puzzle mechanics, platforming, and levels coming in the near future!"), new Text(width/2, height/2 + 40, 15, "The possibilities with these puzzles are endless!")];
      var texts2 = [];
      var plane1 = new Plane(new Player(100, 40, "Assets/Player1", ["%", "'", "&", "(", "¾"]), objects1, new Vector(0, 0.7), "Assets/plane1Background.png", texts1);
      var plane2 = new Plane(new Player(100, 40, "Assets/Player2", ["%", "'", "&", "(", "¾"]), objects2, new Vector(0, 0.7), "Assets/plane2Background.png", texts2);
      return new Level(plane1, plane2, levelNum);
    }
  });

function Level(plane1, plane2, levelNum) {
  this.plane1 = plane1;
  this.plane2 = plane2;
  this.levelNum = levelNum
  this.plane1.level = this;
  this.plane2.level = this;
  this.front1 = true;
  //this.completed = false;

  this.update = function () {
    this.plane1.update();
    this.plane2.update();
  }

  this.draw = function () {

    if (!this.completed) {

      ctx.save();

      if (this.front1) {
        this.plane1.draw();
      }
      else {
        this.plane2.draw();
      }

      ctx.translate(width / 3 * 2, 0);
      ctx.scale(1 / 3, 1 / 3);

      if (!this.front1) {
        this.plane1.draw();
      }
      else {
        this.plane2.draw();
      }

      ctx.restore();

    }

    else {

      if (this.front1) {
        ctx.drawImage(this.plane1.img, 0, 0, width, height);
      }
      else {
        ctx.drawImage(this.plane2.img, 0, 0, width, height);
      }
      new Text(width / 2, height/2, 30, "Level Completed!").draw();
      new Text(width / 2, height/2 + 50, 20, "Your conscious will be sent to the next level in 5 seconds...").draw();

    }

  }

  this.complete = function () {

    this.completed = true;


    setTimeout(this.advanceLevel, 5000);


  }

  this.advanceLevel = function () {


    levelNum++;
    levelScreen.level = levels[levelNum].gen();

  }

  this.keydown = function (code) {
    if (this.front1) {
      this.plane1.player.keydown(code);
    }
    else {
      this.plane2.player.keydown(code);
    }

  }

  this.keyup = function (code) {

    this.plane1.player.keyup(code);

    this.plane2.player.keyup(code);
  }

}
