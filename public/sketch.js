let selected = [0,];
const width = 100, height = 100;
const cellWidth = window.innerWidth / width;
const cellHeight = window.innerHeight / height;
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
  createCanvas(window.innerWidth, window.innerHeight);
  socket = io();
  socket.on('update', items => {
    selected = items;
    draw();
  });

  color = initRandomColor();
  noLoop();
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);

  for (let y = 0; y <= width; y++) {
    for (let x = 0; x <= height; x++) {
      let xpos = x * cellWidth;
      let ypos = y * cellHeight;
      let index = y * width + x; // find the index
      
      const pixel = selected.find((item) => item.index === index);
      if (pixel) {
        fill(pixel.color);
      } else {
        fill(255);
      }

      stroke('rgba(0,0,0,0.2)');
      rect(xpos, ypos, cellWidth, cellHeight);
      let h = map(index, 0, 69, 0, 255);
      fill(h);
      noStroke();
      text(index, xpos, ypos, cellWidth, cellHeight);

    }
  }
}

function mouseClicked() {
  const x = parseInt(mouseX / cellWidth);
  const y = parseInt(mouseY / cellHeight);
  console.log(x, y);
  if (x < height && y < width) {
    const index = (y * width + x);
    socket.emit('select', {index: index, color: color});
  }
}