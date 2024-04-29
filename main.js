import "/style.css";
import "/p5.min.js";

const gridWidth = 5;
const gridHeigth = 5;

class cell {

    constructor(a,x,y) {
        this.aLive =  a,
        this.position = {
            x: x,
            y: y
        }
    }

    get getNeighbors() {

        const arrNeighbor = new Array

        const B = [
            {x: -1, y: -1},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: 1},
            {x: 1, y: 1}
        ]


        B.forEach(neighbors => {

            if (this.position.x + neighbors.x >= 0 && this.position.y + neighbors.y >= 0 && this.position.x + neighbors.x < gridWidth && this.position.y + neighbors.y < gridHeigth)
            {

                const neighborsPosition = {
                    x: this.position.x + neighbors.x,
                    y: this.position.y + neighbors.y
                }

                arrNeighbor.push(neighborsPosition)
            }

        });

        return arrNeighbor;
    }
}

class grid {
    
    constructor(){
        this.gridWidth = 0
        this.gridHeigth = 0
        this.cell = (a,x,y) => new cell(a,x,y)
    }


    /**
     * @param {number} value
     */
    set setWidth(value) {
        this.gridWidth = value
    }

    /**
     * @param {number} value
     */
    set setHeigth(value) {
        this.gridHeigth = value
    }

    get createGrid(){

        const model = new Array

        for (let y = 0; y < this.gridHeigth; y++) {

            const row = new Array

            for (let x = 0; x < this.gridWidth; x++) {

                const cell = this.cell(0,x,y)
                
                row.push(cell)
                
            }

            model.push(row)
            
        }

        return model
    }

    newGrid(grid, empityGrid) {
        
        const newGrid = Object.values(empityGrid)

        function neighborsLivingCount(pX,pY) {

            let neighborsCount = 0;

            const neighbors = new cell(0,pX,pY).getNeighbors

            neighbors.forEach(b => {

                if (grid[b.y][b.x].aLive === 1) {
                    neighborsCount++
                }

            });

            return neighborsCount;
        }


        grid.forEach((a, y) => {
            a.forEach((b, x) => {
                
                const neighborsLiving = {
                    count: neighborsLivingCount(b.position.x, b.position.y) 
                }

                if (b.aLive === 1 && neighborsLiving.count === 2 || neighborsLiving.count === 3) {
                    newGrid[y][x].aLive = 1
                }else if(b.aLive === 0 && neighborsLiving.count === 3){
                    newGrid[y][x].aLive = 1
                }else if(b.aLive === 1 && neighborsLiving.count > 3){
                    newGrid[y][x].aLive = 0
                }else if(b.aLive === 1 && neighborsLiving.count < 2){
                    newGrid[y][x].aLive = 0
                }

            });
        });
    

        return newGrid;
    }

    randomizeCells(grid){

        const rand = grid

        rand.forEach((a, y) => {
            a.forEach((b, x) => {

                b.aLive = Math.floor(Math.random() * 2)

            })
        })

        return rand;
    }

    update(grid) {

        grid.forEach((a, y) => {
            a.forEach((s, x) => {
                const index = (y * this.gridWidth) + x
                const element = document.getElementById(index)

                if (s.aLive === 1) {
                    element.style.backgroundColor='black'
                }else{
                    element.style.backgroundColor='white'
                }

            });
        });
        
    }

    render(grid) {

        

    }
}

let model = new grid()

model.setWidth = gridWidth
model.setHeigth = gridHeigth

let currentGrid = model.randomizeCells(model.createGrid)

const gridSize = {
    width: 700,
    height: 700
}

const cellSize = {
    width: gridSize.width / gridWidth,
    height: gridSize.height / gridHeigth
}

const setup = (p) =>  function(){

    p.frameRate(10);
    p.createCanvas(gridSize.width, gridSize.height)
    p.background(200)



}

const draw = (p) => function(){

    p.fill(100)

    currentGrid.forEach((a, y) => {

        a.forEach((b, x) => {

            const width = b.position.x * cellSize.width;
            const height = b.position.y * cellSize.height;

            p.rect(width, height, gridSize.width, gridSize.height)

        })
    })
}

const intance = (p) => {

    p.setup = setup(p)
    p.draw = draw(p)

}

new p5(intance);