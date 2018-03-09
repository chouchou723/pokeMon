var canvas = document.getElementById("canvastar"),
  ctx = canvas.getContext("2d");

var ww, wh, clipSize;

var stars = [];

function Star(x, y, kaboom) {

  this.scale = (Math.random() + 0.2) * 20;
  this.scaleSpeed = Math.random() / 5 + 0.01;
  this.x = x || Math.random() * ww;
  this.y = y || Math.random() * wh;
  this.vx = (Math.random() - 0.5) * (kaboom ? 10 : 4);
  if (kaboom) {
    this.vy = (Math.random() - 0.5) * 10;
  } else {
    this.vy = Math.random() * 3;
  }
  this.opacity = 1;
  this.opacitySpeed = Math.random() / 100;
  this.rotate = Math.random() * Math.PI;
  this.rotateSpeed = (Math.random() - 0.5) * 0.1;
  this.color = "hsl(" + (~~(Math.random() * 30) + 200) + ",60%,60%)";
  this.out = [];
  this.in = [];
  for (var i = 0; i < 5; i++) {
    var x = Math.cos(i / 5 * Math.PI * 2) * this.scale;
    var y = Math.sin(i / 5 * Math.PI * 2) * this.scale;
    this.out.push([x, y]);

    var x = Math.cos((i + 0.5) / 5 * Math.PI * 2) * this.scale * 0.5;
    var y = Math.sin((i + 0.5) / 5 * Math.PI * 2) * this.scale * 0.5;
    this.in.push([x, y]);
  }
  
  this.image = document.createElement('canvas');
  this.image.width = this.scale*4;
  this.image.height = this.scale*4;
  this.ctx = this.image.getContext('2d');
  this.ctx.translate(this.scale*2, this.scale*2);
  this.ctx.beginPath();
  this.ctx.moveTo(this.in[0][0], this.in[0][1]);
  for (var i = 0; i < 5; i++) {
  this.ctx.bezierCurveTo(this.out[i][0], this.out[i][1], this.out[i][0], this.out[i][1], this.in[i][0], this.in[i][1]);
  }
  this.ctx.bezierCurveTo(this.out[0][0], this.out[0][1], this.out[0][0], this.out[0][1], this.in[0][0], this.in[0][1]);
  this.ctx.closePath();
  this.ctx.fillStyle = this.color;
  this.ctx.shadowColor = this.color;
  this.ctx.shadowBlur = 20;
  this.ctx.fill();

}
Star.prototype.draw = function(i) {

  //Update
  this.rotate += this.rotateSpeed;
  this.scale = Math.max(0, this.scale - this.scaleSpeed);
  this.vy = Math.min(10, this.vy + 0.005);
  this.x += this.vx;
  this.y += this.vy;
  this.opacity -= this.opacitySpeed;

  ctx.save();
  ctx.globalAlpha = Math.max(this.opacity, 0);
  ctx.translate(this.x, this.y);
  ctx.scale(this.scale / 20, this.scale / 20);
  ctx.rotate(this.rotate);
  
  ctx.drawImage(this.image, -this.scale,-this.scale)

  ctx.restore();
}

var mouse = {
  x: window.innerWidth / 2,
  y: -10
}
window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX + (Math.random() - 0.5) * 25;
  mouse.x = Math.min((ww - clipSize * 2) / 2 + clipSize * 2, Math.max(mouse.x, (ww - clipSize * 2) / 2));
  mouse.y = e.clientY + (Math.random() - 0.5) * 25;
});
window.addEventListener("touchmove", function(e) {
  mouse.x = e.touches[0].clientX + (Math.random() - 0.5) * 25;
  mouse.x = Math.min((ww - clipSize * 2) / 2 + clipSize * 2, Math.max(mouse.x, (ww - clipSize * 2) / 2));
  mouse.y = e.touches[0].clientY + (Math.random() - 0.5) * 25;
});
window.addEventListener("click", function(e) {
  document.querySelector("#info").style.opacity = "0";
  for (var i = 0; i < 50; i++) {
    stars.push(new Star(mouse.x, mouse.y, true));
  }
});
window.addEventListener("touchstart", function(e) {
  document.querySelector("#info").style.opacity = "0";
  for (var i = 0; i < 50; i++) {
    stars.push(new Star(mouse.x, mouse.y, true));
  }
});
window.addEventListener("resize", onResize);

function onResize() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = 1179;//canvas.height = window.innerHeight;
  clipSize = Math.min(ww / 2 - 4, wh / 2 - 4);
  ctx.shadowBlur = 20;
  if(navigator.userAgent.toLowerCase().indexOf('firefox') === -1){
    ctx.globalCompositeOperation = "screen";
  }
  //Clip circle
  // ctx.arc(ww / 2, wh / 2, clipSize, 0, Math.PI * 2, false);
  // ctx.clip();
}

var prevA = 0;

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, ww, wh);

  ctx.beginPath();
  // ctx.arc(ww / 2, wh / 2, clipSize, 0, Math.PI * 2, false);
  // ctx.fillStyle = gradient;
  // ctx.fill();

  if (a - prevA > 20) {
    stars.push(new Star(mouse.x, mouse.y));
  }
  for (var i = 0, j = stars.length; i < j; i++) {
    var star = stars[i];
    star.draw(i);
    if (
      star.x - star.scale > ww ||
      star.x + star.scale < 0 ||
      star.y - star.scale > wh ||
      star.y + star.scale < 0 ||
      star.opacity <= 0
    ) {
      stars.splice(i, 1);
      i--;
      j--;
    }
  }

}
onResize();

// var gradient = ctx.createRadialGradient(0, 0, 200, 100, wh / 2, ww);
// gradient.addColorStop(0, "#010810");
// gradient.addColorStop(1, "#2a4770");

requestAnimationFrame(render);