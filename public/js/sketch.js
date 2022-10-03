
const ncells = 101;
const canvas_w = 909;
const canvas_h = 909;
const cell_size = canvas_w / ncells;
const ngens = canvas_h / cell_size;
const ruleset = [0, 1, 0, 1, 1, 0, 1, 0];  // rule 90

var gen;



var cells = new Array(ncells);

function setup() {
  createCanvas(canvas_w, canvas_h);
  background(0, 240, 220);
  

  // init 0th generation
  for (let c = 0; c < cells.length; c++) {
    cells[c] = 0;
  }
  cells[50] = 1;
  gen = 0;
}

function draw() {
  // background(0, 240, 220);
  // make new generation 
  
  
  if (gen < ngens) {
    stroke(64);
    strokeWeight(1);
    push();
    translate(0, gen * cell_size);
    for (let c = 0; c < cells.length; c++) {
      if (cells[c] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(0, 0, cell_size, cell_size);
      translate(cell_size, 0);
    }
    pop();
  }
  var newcells = new Array(ncells);
  
  for (let c = 1; c < cells.length-1; c++) {
    newcells[c] = applyRule(cells[c-1], cells[c], cells[c+1]);
  }
  newcells[0] = cells[0];
  newcells[cells.length-1] = cells[cells.length-1];
  cells = newcells.slice();
  gen += 1;
}

function applyRule(l, m, r) {
  let i = (l*1) + (m*2) + (r*4);
  return ruleset[i];
}