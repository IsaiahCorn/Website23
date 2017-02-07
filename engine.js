 
// global vars
var div = document.createElement('div'),
    canvas = document.createElement('canvas'),    
    ctx = canvas.getContext('2d'),
    mouseX = 0, 
    mouseY = 0,
    w = canvas.width = 960,
    h = canvas.height = 300;

// event listener updates the mouse coords
window.addEventListener('mousemove', function(evt) {
  var rect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}, false);

// initialization and main loop
function Init () {
  document.body.appendChild(div);
  div.style.position = "fixed";
  div.style.left=div.style.right=div.style.top=div.style.bottom="0";
  div.appendChild(canvas);
}

function Loop() {
  ctx.clearRect(0,0,w,h);
  
  var grd,
      grdArr,
      rect,
      curTime = new Date() / 250,
      tSin = Math.sin(curTime) * 1.5,
      tCos = Math.cos(curTime) * 1.5;
  
  SetMargins();
  
  // Draw eyes
  var x = (mouseX - 480) / 10,
      y = (mouseY - 150) / 10,
      d = Math.sqrt(Math.pow(320-mouseX,2)+Math.pow(150-mouseY,2)),
      mod = 1 - Math.pow(d / 4000, 2),
      modSq = mod * mod;
  
  grdArr = [[0,32,32,32,1], [0.16*modSq,24,24,24,1],
            [0.18*modSq,205,0,32,1], [0.23*mod,160,0,24,1],
            [0.35*mod,100,0,10,1],  [0.39*mod,64,0,8,1],
            [0.41*mod,230,230,230,1], [0.61,224,224,224,1],
            [0.79,214,212,209,1], [0.88,226,226,226,1],
            [0.89,196,194,194,1], [0.9,96,96,96,0.6],
            [1,48,48,48,0]];  
  grd = ctx.createRadialGradient(320 + x + tCos, 150 + y + tSin, 0, 
                                 320 + x/50, 150 + y/50, 150 + tCos/5);
  rect = [0,0,w/2,h];  
  DrawGrad(grd,grdArr,rect);
  
  grd = ctx.createRadialGradient(640 + x + tCos, 150 + y + tSin, 0,
                                 640 + x/50, 150 + y/50, 150 + tCos/5);
  rect = [w/2,0,w/2,h];
  DrawGrad(grd,grdArr,rect);
  
  window.requestAnimationFrame(Loop);
}

Init();
Loop();

// functions
function SetMargins () {
  var marginL = Math.round((div.offsetWidth - w) / 2),
      marginT = Math.round((div.offsetHeight - h) / 2);   
  canvas.style.marginLeft = marginL + "px";  
  canvas.style.marginTop = marginT + "px";
}

function DrawGrad (grd, arr, rect) {
  for (var i = 0; i < arr.length; i++) {
    var col = 'rgba(' + arr[i][1] + ',' + arr[i][2] + ',' + 
        arr[i][3] + ',' + arr[i][4] + ')';
    grd.addColorStop(arr[i][0], col);
  }  
  ctx.fillStyle = grd;
  ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
}
