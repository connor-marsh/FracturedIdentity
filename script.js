//*************** CURRENT IDEAS FOR HOW TO RUN EVERYTHING
//  Rendering:
// Have main plane cover the screen with a minified version of the second plane in top right
// Press SPACE to switch which plane is main. You can only control the character in the main plane
//  Levels:
// Array of JSON objects which have the parameters of each level. To create a level you do new Level(levels[i].player,)etc
// Have a function that can build a level out of the level data


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width
var height = ctx.canvas.height
var draw;
var fps = 60;
var zero = new Vector(0, 0);
var firstClick = true;
var firstPlay = true;
var mouseControls = false;
// Eventually Ill give planes background images and players images/spritesheets

var mainSong = new Audio();
mainSong.src = "Assets/MainSong.mp3";

//["A", "D", "W", "S", "E"]

var homeScreen = new Screen([new Text(width/2, 200, 50, "Fractured Identity"), new Text(width/2, 250, 20, "2061-902's video game")], [new Button(width/2-50, height/2-30, 100, 60, function(){if (firstPlay){screen=new StoryScreen();firstPlay=false;}else{screen=levelSelect;}}, "orange", new Text(0, 0, 13, "Level Select"))], "Assets/plane1Background.png");
var levelSelect = new Screen([], [new Button(10, 10, 100, 40, function(){screen=homeScreen}, "orange", new Text(0, 0, 13, "Home Screen"))], "Assets/plane2Background.png");
// Level buttons (level 0 is testing level) make i = 0 to access testing level
for (let i = 1; i < levels.length; i++) {
  levelSelect.buttons.push(new Button(200 + (i-1)%10*100, 200 + 100*Math.floor((i-1)/10), 50, 50, function(){levelScreen.level = levels[i].gen(); screen=levelScreen;}, "orange", new Text(0, 0, 15, i)));
}
var levelScreen = new LevelScreen();
var screen = homeScreen;

function frame() {
  // Clear background
  //ctx.clearRect(0, 0, width, height)
  // ctx.fillStyle = "#dddddd"
  // ctx.fillRect(0, 0, width, height)
  
  screen.update();
  screen.draw();

}

document.addEventListener("keydown", function(e) {
  e.preventDefault();
  // ¾ is period
  var code = String.fromCharCode(e.keyCode);
  screen.level.keydown(code);
});
document.addEventListener("keyup", function(e) {
  e.preventDefault();
  var code = String.fromCharCode(e.keyCode);
  screen.level.keyup(code);
});

var mouseisdown = false;
var mousex;
var mousey;
document.addEventListener("mousedown", function(e) {
  e.preventDefault();

  if (firstClick) {
    mainSong.play();
    firstClick = false;
  }

  mousex = e.pageX - ctx.canvas.offsetLeft;
  mousey = e.pageY - ctx.canvas.offsetTop;
  mouseisdown=true;
});
document.addEventListener("mousemove", function(e) {
  e.preventDefault();
  screen.mousemove(e.pageX - ctx.canvas.offsetLeft, e.pageY - ctx.canvas.offsetTop);
});
document.addEventListener("mouseup", function(e) {
  e.preventDefault();
  screen.mouseup(e.pageX - ctx.canvas.offsetLeft, e.pageY - ctx.canvas.offsetTop, mousex, mousey);
});



function start() {
  //mainSong.play();
  draw = setInterval(frame, 1000/fps);
}
function stop() {
  //mainSong.pause();
  clearInterval(draw)
}
start();
