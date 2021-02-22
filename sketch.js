let arr = [];

const width = 5, height = 5;

function setup() {
  createCanvas(501, 500);
  
  for(let i =0; i<50; i++){
   arr.push(i); 
  }
  
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);

  
  for (let y = 0; y <= width; y++) {
    for (let x = 0; x <= height; x++) {
      let xpos = x *100;
      let ypos = y *100;
      
      let index = y * width + x; // find the index
      
      if( inside(xpos, ypos, 100,100) ){
        // were inside
        fill(255,0,0);
      } else {
        // not inside
      	fill(255);
      }
      
      stroke(0);
      rect(xpos, ypos, 100, 100);
      
      // colorMode(HSB);
      let h = map(index, 0, 69, 0, 255);
      fill(h);
      noStroke();
      text(arr[index], xpos, ypos, 100,100);
      
      // colorMode(RGB);
    }
  }

}


function inside(x, y, w, h){
 if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
  return true; 
 } else {
  return false; 
 }
}

function mouseClicked() {
  console.log(parseInt(mouseX/100), parseInt(mouseY/100));
}