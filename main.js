import "/style.css";

const gridWidth = 20
const gridHeigth = 20

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
        this.gridWidth = 30
        this.gridHeigth = 30
        this.cell = (a,x,y) => new cell(a,x,y)
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

    newGrid(grid) {
        
        const sameGrid = this.createGrid

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
                    sameGrid[y][x].aLive = 1
                }else if(b.aLive === 0 && neighborsLiving.count === 3){
                    sameGrid[y][x].aLive = 1
                }else if(b.aLive === 1 && neighborsLiving.count > 3){
                    sameGrid[y][x].aLive = 0
                }else if(b.aLive === 1 && neighborsLiving.count < 2){
                    sameGrid[y][x].aLive = 0
                }

            });
        });
    

        return sameGrid;
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

        const HTMLGrid = document.getElementById('grid')
        const renderElement = (node, element) => {return node.insertAdjacentElement('beforeend', element)}

        const width = this.gridWidth
        const height = this.gridHeigth

        function createElement (width, height, x, y, aLive) {

            const element = document.createElement("div")
            const colorElement = (g) => {if(g) {return 'background-color: black'}else{return 'background-color: white'}}
            const index = (y * width) + x

            element.setAttribute('class', 'cell')
            element.setAttribute('style', `${colorElement(aLive)}; width: calc(100%/${width}); height: calc(100%/${height});`)
            element.setAttribute('id', index)

            return element;
        }

        function renderRow (HTMLGrid, a) {

            a.forEach((u) => {
                
                const HTMLcell = createElement(width, height, u.position.x, u.position.y, u.aLive)
            
                renderElement(HTMLGrid, HTMLcell)

            })

        }

        grid.forEach(a => {

            renderRow(HTMLGrid, a)
        });
    }
}

let gr = new grid().createGrid

new grid().render(gr)

setInterval(() => {

    gr = new grid().newGrid(gr)

    new grid().update(gr)

}, 100);