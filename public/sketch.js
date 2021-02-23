let selected = [0,];
const width = 5, height = 5;
let socket;
let color;

const initRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function setup() {
  createCanvas(500, 500);
  socket = io();
  socket.on('update', items => selected = items);
  color = initRandomColor();
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
        fill(color);
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

function mouseClicked() {
  const x = parseInt(mouseX / 100);
  const y = parseInt(mouseY / 100);

  console.log(x, y);
  if (x < height && y < width) {
    const index = (y * width + x);
    if (selected.find(item => item === index)) {
      socket.emit('deselect', index);
    } else {
      socket.emit('select', index);
    }
  }
}