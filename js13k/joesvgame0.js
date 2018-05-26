(function() {
  w = window
  var requestAnimationFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
  w.requestAnimationFrame = requestAnimationFrame;
})();
//basic functions renamed
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
// basic vars
var camera = {
  x: 0,
  y: 0
}
var keys = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width = 480;
var height = canvas.height = 480;
var reverseTimer = 5;
var tilesize = 16
var player = {x: width / 2 - tilesize / 2, y: height /2 - tilesize / 2, w: tilesize, h: tilesize, vx: 0, vy: 0, c: '#FFF', s: 4, f: 0.8}; // c is color, f is friction
//var ball = {x: width / 2 - 4, y: height / 2 -4, w: 8, h: 8, vx: 6, vy: 6, c: '#FFF'}
//debug stuff
var debug = document.getElementById("debug");
function debugField(){
  debug.value = player.x + '    '+player.y + '    '+player.vx+'   '+player.vy
}


console.log(player)
function drawRect(o){ //object consists of x,y,w,h,c
  ctx.fillStyle = o.c;
  ctx.fillRect(o.x, o.y, o.w, o.h)
}
function render(){
  drawRect({x: 0, y:0, w:width, h:height, c:"#000"})
  drawPlayer()

}
function drawPlayer(){
  drawRect({x: (player.x - camera.x)* tilesize, y: (player.y - camera.y)*tilesize - 10, w: player.w, h: player.h, c: player.c })
}
function update(){
  if(keys[38]){
    if(player.vy > -player.s){
      player.vy--;
    }
  }
  if(keys[37]){
    if(player.vx > -player.s){
      player.vx--;
    }
  }
  if(keys[39]){
    if(player.vx < player.s){
      player.vx++;
    }
  }
  if(keys[40]){
    if(player.vy < player.s){
      player.vy++;
    }
  }
  player.vx *= player.f;
  player.vy *= player.f
  player.x += player.vx;
  player.y += player.vy;

  camera.x = player.x - floor((width / tilesize) / 2);
  camera.y = player.y - floor((height / tilesize) /2);

}
function main(){
  console.log("running")
  console.log(player)
  update()
  render()


  debugField()


  requestAnimationFrame(main)
}

addEventListener("load", function(){
  main()
})
addEventListener("keydown", function(e){
  keys[e.keyCode] = true;
})
addEventListener("keyup", function(e){
  keys[e.keyCode] = false;
})
