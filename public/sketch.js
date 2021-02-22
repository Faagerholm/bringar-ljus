let arr = [];
let selected = [0,];
const width = 5, height = 5;
let socket;

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 25; i++) {
    arr.push(i);
  }
  socket = io();
  socket.on('update', items => selected = items); 
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);

  for (let y = 0; y <= width; y++) {
    for (let x = 0; x <= height; x++) {
      let xpos = x * 100;
      let ypos = y * 100;
      let index = y * width + x; // find the index

      if (selected.find((item) => item === index)) {
        fill(255, 0, 0);
      } else {
        fill(255);
      }

      stroke(0);
      rect(xpos, ypos, 100, 100);

      let h = map(index, 0, 69, 0, 255);
      fill(h);
      noStroke();
      text(index, xpos, ypos, 100, 100);

    }
  }
}


function inside(x, y, w, h) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    return true;
  } else {
    return false;
  }
}

function mouseClicked() {
  const x = parseInt(mouseX / 100);
  const y = parseInt(mouseY / 100);

  if (x < 5 && y < 5) {
    const index = (y * width + x);
    if (selected.find(item => item === index)) {
      socket.emit('deselect', index);
    } else {
      socket.emit('select', index);
    }
  }
}