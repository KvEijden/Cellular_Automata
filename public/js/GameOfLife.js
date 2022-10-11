// Class GameOfLife: Properties and Methods tp play one game of life
//
class GameOfLife {
  constructor(r, c, s) {
    this.c = c;  // number of columns
    this.r = r;  // number of rows
    this.s = s;  // size of the cell in pixels
    this.death = [1.0, 0.8, 0.0, 0.0, 0.4, 0.6, 0.8, 1,0, 1,0];
    this.birth = [0.0, 0.1, 0.3, 1.0, 0.5, 0.3, 0.1, 0.0]
    this.generation = 0;
    
    // construction of 2D Grid for holding the cells
    //
    this.grid = new Array(this.r);
    for (let i = 0; i < this.r; i++) {
      this.grid[i] = new Array(this.c);
    }
    
    // Populate grid with cells
    //
    for (let y = 0; y < this.r; y++) {
      for (let x = 0; x < this.c; x++) {
        this.grid[y][x] = new Cell(x, y, this.s);
      }
    }
  }
  
  // Generate initial random configuration 
  // 
  generationZero(fraction) {
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        if (random(0,1) < fraction) {
          this.grid[r][c].setState(0);
        } else {
          this.grid[r][c].setState(1);
        }
      }
    }
    this.generation = 0;
  }
  
  nextGeneration() {
    // Save current state of every cell 
    //
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        this.grid[r][c].saveState();
      }
    }
    
    // For every cell calculate the number of living cells in it's neighbourhood
    //
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        let living_cells = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let row = r + i;
            let col = c + j;
            if (row == -1) {
              row = this.r - 1;
            }
            if (row == this.r) {
              row = 0;
            }
            if (col == -1) {
              col = this.c - 1;
            }
            if (col == this.c) {
              col = 0;
            }
            living_cells += this.grid[row][col].getPrevious();
          }
        }
        living_cells -= this.grid[r][c].getPrevious();
        this.grid[r][c].neighbours = living_cells;
          
          // alive or dead
        if (this.grid[r][c].getPrevious() == 1) {
          if (living_cells < 2 || living_cells > 4) {
            this.grid[r][c].setState(0);
          } else {
            this.grid[r][c].setState(1);
          }
        } else {                                  // dead --> alive
          if (living_cells == 3) {
            this.grid[r][c].setState(1);
          } else {
            this.grid[r][c].setState(0);
          }
        }
      }
    }
  }
  
  /*
  getGridCoord(px, py) {         // getCell in which point (px, py) lies
    let c = int(px/this.s);
    let r = int(py/this.s);
    if (c < 0 || c >= this.c || r < 0 || r >= this.r) {
      return null;
    }
    let coord = [r, c];
    return coord;
  }
  
  getGridCell(px, py) {
    let coord = this.getGridCoord(px, py);
    if (coord == null) {
      return null;
    }
    return this.grid[coord[0]][coord[1]];
  }
  
  subscribeToCell(px, py, obj) {
    let cell = this.getGridCell(px, py);
    cell.subscribe(obj);
  }
  
  unsubscribeToCell(px, py, obj) {
    let cell = this.getGridCell(px, py);
    cell.unsubscribe(obj);
  }
  
  */
  
  draw() {
    for(let y = 0; y < this.r; y++) {
      for(let x = 0; x < this.c; x++) {
        this.grid[y][x].draw();
      }
    }
    for(let y = 0; y < this.r; y++) {
      for(let x = 0; x < this.c; x++) {
        this.grid[y][x].text();
      }
    }
  }
}


class Cell {
  constructor(x, y, s) {
    this.position = createVector((x*s) + s/2, (y*s) + s/2);
    this.s =s;
    this.state = null;
    this.previous = null;
    this.neighbours = 0;
    this.history = [];
  }
  
  addToState(delta) {
    this.state += delta;
    if (this.state < 0) {
      this.state = 0;
    }
    if (this.state > 1) {
      this.state = 1;
    }
  }
  setState(state) {
    this.state = state;
    this.history.push(state);
    if (this.history.length > 20) {
      this.history.shift();
    }
  }
  
  getState() {
    return this.state;
  }
  
  saveState() {
    this.previous = this.state;
  }
  
  getPrevious() {
    return this.previous;
  }
  
  /*
  subscribe(obj) {
    this.subscriptions += 1;
    this.subscriptionSet.add(obj);
  }
  
  unsubscribe(obj) {
    if (this.subscriptions > 0) {
      this.subscriptions -= 1;
      this.subscriptionSet.delete(obj);
    }
  }
  */
  
  
  draw() {
    push();
    translate(this.position);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(128);
    // noFill();
    square(0, 0, this.s);
    let c1 = color(255, 0, 0);
    let c2 = color(0, 255, 0);
    let avg_hist = this.history.reduce((a,c) => a + c, 0)/this.history.length;
    let cell_color = lerpColor(c1, c2, avg_hist);
    fill(cell_color);
    noStroke();
    circle(0, 0, this.s * 0.8);
    // fill(0);
    // let a = avg_hist.toPrecision(3);
    // text(a.toString(), 0, 0);
    // print(a);
    pop();
  }
  
  text() {
    push();
    translate(this.position);
    fill(0);
    let avg_hist = this.history.reduce((a,c) => a + c, 0)/this.history.length;
    let a = avg_hist.toPrecision(2);
    text(a.toString(), 0, 0);
    pop();
  }
}
