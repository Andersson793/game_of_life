import p5 from "p5";

const gridWidth = 40;
const gridHeigth = 40;
const p = 950;
const o = document.body.clientWidth;

class cell {
  constructor(a, x, y) {
    (this.aLive = a),
      (this.position = {
        x: x,
        y: y,
      });
  }

  get getNeighbors() {
    const arrNeighbor = new Array();

    const B = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    B.forEach((neighbors) => {
      if (
        this.position.x + neighbors.x >= 0 &&
        this.position.y + neighbors.y >= 0 &&
        this.position.x + neighbors.x < gridWidth &&
        this.position.y + neighbors.y < gridHeigth
      ) {
        const neighborsPosition = {
          x: this.position.x + neighbors.x,
          y: this.position.y + neighbors.y,
        };

        arrNeighbor.push(neighborsPosition);
      }
    });

    return arrNeighbor;
  }
}

let currentGrid;

function createGrid() {
  const model = new Array();

  for (let y = 0; y < gridHeigth; y++) {
    const row = new Array();

    for (let x = 0; x < gridWidth; x++) {
      const b = new cell(0, x, y);

      row.push(b);
    }

    model.push(row);
  }

  return model;
}

function randomizeCells(grid) {
  const g = grid;

  g.forEach((a, y) => {
    a.forEach((b, x) => {
      b.aLive = Math.floor(Math.random() * 2);
    });
  });

  return g;
}

currentGrid = createGrid();
currentGrid = randomizeCells(currentGrid);
let nextGrid = createGrid();

function newGrid() {
  function neighborsLivingCount(pX, pY) {
    let neighborsCount = 0;

    const neighbors = new cell(0, pX, pY).getNeighbors;

    neighbors.forEach((b) => {
      if (currentGrid[b.y][b.x].aLive === 1) {
        neighborsCount++;
      }
    });

    return neighborsCount;
  }

  currentGrid.forEach((a, y) => {
    a.forEach((b, x) => {
      const neighborsLiving = {
        count: neighborsLivingCount(b.position.x, b.position.y),
      };

      if (
        (b.aLive === 1 && neighborsLiving.count === 2) ||
        neighborsLiving.count === 3
      ) {
        nextGrid[y][x].aLive = 1;
      } else if (b.aLive === 0 && neighborsLiving.count === 3) {
        nextGrid[y][x].aLive = 1;
      } else if (b.aLive === 1 && neighborsLiving.count > 3) {
        nextGrid[y][x].aLive = 0;
      } else if (b.aLive === 1 && neighborsLiving.count < 2) {
        nextGrid[y][x].aLive = 0;
      }
    });
  });

  currentGrid = nextGrid;
  nextGrid = createGrid();
}

const gridSize = {
  width: 200,
  height: 200,
};

const cellSize = {
  width: gridSize.width / gridWidth,
  height: gridSize.height / gridHeigth,
};

const setup = (p) =>
  function () {
    const mycanvas = p.createCanvas(gridSize.width, gridSize.height);

    p.frameRate(10);
    p.background(200);

    mycanvas.parent("conteiner");
  };

const draw = (p) =>
  function () {
    newGrid();

    currentGrid.forEach((a, y) => {
      a.forEach((b, x) => {
        if (b.aLive) p.fill(0);
        else p.fill(250);

        const width = x * cellSize.width;
        const height = y * cellSize.height;

        p.rect(width, height, gridSize.width, gridSize.height);
      });
    });
  };

const intance = (p) => {
  p.setup = setup(p);
  p.draw = draw(p);
};

new p5(intance);
