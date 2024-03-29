import "/style.css";

function game() {

    let grid = {}
    const gridWidth = 30
    const gridHeigth = 20

    function getNeighbors(pX,pY) {

        const arrNeighbor = new Array

        const rPosition = [
            {x: -1, y: -1},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: 1},
            {x: 1, y: 1}
        ]


        rPosition.forEach(neighbors => {

            if (pX + neighbors.x < 0 || pY + neighbors.y < 0 || pX + neighbors.x >= gridWidth || pY + neighbors.y >= gridHeigth)
            {
                return false
            }
            else
            {

                const neighborsPosition = {
                    x: pX + neighbors.x,
                    y: pY + neighbors.y
                }

                arrNeighbor.push(neighborsPosition)
            }

        });

        return arrNeighbor;
    };
    
    function createGrid(gridWidth, gridHeigth) {

        const model = new Array

        for (let y = 0; y < gridHeigth; y++) {

            const row = new Array

            for (let x = 0; x < gridWidth; x++) {

                const cell = {
                    //aLive: Math.floor(Math.random() * 2),
                    aLive: 0,
                    position: {
                        x: x,
                        y: y
                    },
                    neighbors: getNeighbors(x,y)
                }
                
                row.push(cell)
                
            }

            model.push(row)
            
        }

        return model

    }

    function generateNewGrid(grid) {

        const newGrid = createGrid(gridWidth, gridHeigth)

        function neighborsLivingCount(pX,pY) {

            let neighborsCount = 0;
            const cell = grid[pY][pX]
            const neighbors = cell.neighbors

            
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

    function renderGrid(grid, gridWidth, gridHeigth) {

        const HTMLGrid = document.getElementById('grid')
        const renderElement = (node, element) => {return node.insertAdjacentElement('beforeend', element)}

        function createElement (width, height, x, y, aLive) {

            const element = document.createElement("div")
            const colorElement = (g) => {if(g) {return 'background-color: black'}else{return 'background-color: white'}}
            const index = (y * gridWidth) + x

            element.setAttribute('class', 'cell')
            element.setAttribute('style', `${colorElement(aLive)}; width: calc(100%/${width}); height: calc(100%/${height});`)
            element.setAttribute('id', index)
            element.innerHTML = `${x} : ${y}`

            return element;
        }

        function renderRow (HTMLGrid, a) {

            a.forEach((u) => {
                
                const cell = createElement(gridWidth, gridHeigth, u.position.x, u.position.y, u.aLive)
            
                renderElement(HTMLGrid, cell)

            })

        }

        grid.forEach(a => {

            renderRow(HTMLGrid, a)
        });
    }

    function updateGrid(grid) {

        grid.forEach((a, y) => {
            a.forEach((s, x) => {
                const index = (y * gridWidth) + x
                const element = document.getElementById(index)

                if (s.aLive === 1) {
                    element.style.backgroundColor='black'
                }else{
                    element.style.backgroundColor='white'
                }

            });
        });
        
    }

    grid = createGrid(gridWidth, gridHeigth);

    function runGame(grid) {


        grid[5][5].aLive = 1
        grid[5][6].aLive = 1
        grid[5][7].aLive = 1

        setInterval(() => {

            grid = generateNewGrid(grid)

            updateGrid(grid)
            
        }, 100);


    }

    renderGrid(grid, gridWidth, gridHeigth);
    
    runGame(grid);
    
}

game();