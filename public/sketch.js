let selected = [0,];
const cellWidth = 10;
const cellHeight = 10;
const canWidth = 1400/cellWidth;
const canHeight = 700/cellHeight;
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
  createCanvas(1400,700);
  socket = io();
  socket.on('update', items => {
    selected = items;
    draw();
  });

  color = initRandomColor();
  noLoop();
}

function draw() {
  console.log("Draw!")
  background(220);
  textAlign(CENTER, CENTER);

  for (let y = 0; y <= canHeight; y++) {
    for (let x = 0; x <= canWidth; x++) {
      let xpos = x * cellWidth;
      let ypos = y * cellHeight;
      let index = x * canWidth + y; // find the index
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
    }
  }
  console.log("Done!")
}

function mouseClicked() {
  const x = parseInt((mouseY) / cellWidth);
  const y = parseInt((mouseX) / cellHeight);
  const index = Math.floor(y * canWidth + x);
  socket.emit('select', {index: index, color: color});
  console.log("Click!")
}