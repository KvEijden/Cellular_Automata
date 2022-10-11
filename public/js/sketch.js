


const canvas_w = 1200;
const canvas_h = 1000;
const cell_size = 40;

var nrow;
var ncol;

var genCount = 0;

var grid; 


function setup() {
  frameRate(1);
  createCanvas(canvas_w, canvas_h);
  
  document.querySelector('#defaultCanvas0').addEventListener('wheel', preventScroll, {passive: false});


  background(0, 240, 220);
  
  var nrow = canvas_h / cell_size;
  var ncol = canvas_w / cell_size;
  game = new GameOfLife(nrow, ncol, cell_size);
  game.generationZero(0.4678);
}

function draw() {
  background(0, 240, 220);
  game.nextGeneration();
  game.draw();
}

// document.querySelector('#defaultCanvas0').addEventListener('wheel', preventScroll, {passive: false});
function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}
