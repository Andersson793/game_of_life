function game() {

    const grid = new Array()
    const gridWidth = 2
    const gridHeigth = 2
    
    function createGrid(gridHeigth, gridWidth, grid) {

        for (let i = 0; i < gridHeigth; i++) {

            const row = new Array()

            for (let j = 0; j < gridWidth; j++) {

                const cell = {
                    aLive: 0,
                    position: {
                        x: j,
                        y: i
                    }
                }
                
                row.push(cell)
                
            }

            grid.push(row)
            
        }

    }

    function generateNewgrid(grid) {

        grid.forEach(a => {
            a.forEach(b => {
                console.log(b);
            });
        });

        function updateGrid(){
            
        }

    }

    createGrid(gridWidth, gridHeigth, grid);
    
    generateNewgrid(grid);
}

game();