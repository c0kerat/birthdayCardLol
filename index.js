const mainCard = document.getElementById("main-card");

let mousePos = [0,0];
let mousePosFrameEarlier = [0,0];
let mouseVelocity = [0,0];
let rotationVelocity = [0,0];
let rotation = [0,0,0];
let mouseHeld = false;

let start = null;

requestAnimationFrame(physicsLoop);

function physicsLoop(timestamp) {
  if (!start) start = timestamp;
  let tElapsed = timestamp - start;
  start = timestamp;
  
  updatePhysics(tElapsed);
  requestAnimationFrame(physicsLoop);
}

document.onmousemove = (event) => {
    mousePos[0] = event.clientX - window.innerWidth / 2;
    mousePos[1] = event.clientY - window.innerHeight / 2; 
}

document.onmousedown = (event) => {
    mouseHeld = true;
    console.log(mouseHeld)
}

document.onmouseup = (event) => {
    mouseHeld = false;
    console.log(mouseHeld)
    rotationVelocity[0] = mouseVelocity[0];
    rotationVelocity[1] = -mouseVelocity[1];
}

function updatePhysics(dtime) {
    mouseVelocity[0] = mousePos[0] - mousePosFrameEarlier[0];
    mouseVelocity[1] = mousePosFrameEarlier[1] - mousePos[1];
    mousePosFrameEarlier[0] = mousePos[0];
    mousePosFrameEarlier[1] = mousePos[1];

    if (mouseHeld) 
    {
        rotation[0] += mouseVelocity[0];
        rotation[1] += -mouseVelocity[1];
        rotate(mainCard, rotation[0], -rotation[1], 0)
    } else {
        rotation[0] += rotationVelocity[0]
        rotation[1] += rotationVelocity[1]
    }
    
    if (rotation[0] >= 360 || rotation[0] < -360) 
    {
        rotation[0] = 0;
    }
    if (rotation[1] >= 360 || rotation[1] < -360) 
    {
        rotation[1] = 0;
    }
    rotate(mainCard, rotation[0], -rotation[1], 0)
}

function rotate(element,xRot,yRot,zRot) {element.style.transform = `rotate3d(0, 1, 0, ${xRot}deg) rotate3d(1, 0, 0, ${yRot}deg) rotate3d(0, 0, 1, ${zRot}deg)`}