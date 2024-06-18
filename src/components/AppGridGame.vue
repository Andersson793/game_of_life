<script>
import p5 from "p5";
import { useStore } from "../store/pinia";


export default {
    data(){
        return{
            store: useStore(),
            windowWidth: document.body.clientWidth,
            windowHeight: document.body.clientHeight - 32,
            gridPopulation: useStore().gridPopulation,
            gridCols: useStore().gridColumns * this.gridPopulation,
            gridRows: useStore().gridRows * this.gridPopulation,
            grid: undefined
        }
    },

    mounted() {

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

                    if (this.position.x + neighbors.x >= 0 && this.position.y + neighbors.y >= 0 && this.position.x + neighbors.x < gridCols && this.position.y + neighbors.y < gridRows)
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
        
        const model = new Array

        for (let y = 0; y < globalThis.gridRows; y++) {

            const row = new Array

            for (let x = 0; x < gridCols; x++) {

                const b = new cell(0,x,y)
                
                row.push(b)
                
            }

            model.push(row)
            
        }

        this.grid = model

        /** */

        function createGrid(){

            const model = new Array

            for (let y = 0; y < globalThis.gridRows; y++) {

                const row = new Array

                for (let x = 0; x < gridCols; x++) {

                    const b = new cell(0,x,y)
                    
                    row.push(b)
                    
                }

                model.push(row)
                
            }

            return model;
        }

        let currentGrid;
        let nextGrid;

        currentGrid = createGrid();
        currentGrid = randomizeCells(currentGrid);
        nextGrid = createGrid();

        this.renderGrid()

    },

    methods :{


        randomizeCells(grid){

            const g = grid

            g.forEach((a, y) => {
                a.forEach((b, x) => {

                    b.aLive = Math.floor(Math.random() * 2)

                })
            })

            return g;
        },

        newGrid() {

            function neighborsLivingCount(pX,pY) {

                let neighborsCount = 0;

                const neighbors = new cell(0,pX,pY).getNeighbors

                neighbors.forEach(b => {

                    if (currentGrid[b.y][b.x].aLive === 1) {
                        neighborsCount++
                    }

                });

                return neighborsCount;
            }

            currentGrid.forEach((a, y) => {
                a.forEach((b, x) => {
                    
                    const neighborsLiving = {
                        count: neighborsLivingCount(b.position.x, b.position.y) 
                    }

                    if (b.aLive === 1 && neighborsLiving.count === 2 || neighborsLiving.count === 3)
                    {
                        nextGrid[y][x].aLive = 1
                    }else if(b.aLive === 0 && neighborsLiving.count === 3)
                    {
                        nextGrid[y][x].aLive = 1
                    }else if(b.aLive === 1 && neighborsLiving.count > 3)
                    {
                        nextGrid[y][x].aLive = 0
                    }else if(b.aLive === 1 && neighborsLiving.count < 2)
                    {
                        nextGrid[y][x].aLive = 0
                    }

                });
            });

            currentGrid = nextGrid;
            nextGrid = createGrid();

        },

        renderGrid(){

            const newGrid = this.newGrid()

            const cellSize = {
                width: this.windowWidth / this.gridCols,
                height: this.windowHeight / this.gridRows
            }

            const setup = (p) =>  function(){

                const mycanvas = p.createCanvas(this.windowWidth, this.windowHeight)

                p.frameRate(10);
                p.background(200)

                mycanvas.parent('conteiner')

            }

            const draw = (p) => function(){

                newGrid()

                currentGrid.forEach((a, y) => {

                    a.forEach((b, x) => {

                        if (b.aLive)
                            p.fill(0)
                        else
                            p.fill(250)
                        

                        const width = x * cellSize.width;
                        const height = y * cellSize.height;

                        p.rect(width, height, this.windowWidth, this.windowHeight)

                    })
                })
            }

            const intance = (p) => {

                p.setup = setup(p)
                p.draw = draw(p)

            }

            new p5(intance);
        }


    },

    updated () {
        console.log('Updated')
        
    }
}

</script>
<template>
    <div id="conteiner">
        <div class="bg-black text-green-500  flex justify-around py-1" @click="">
            <span>grid population: {{ store.gridPopulation }}</span>
            <span>grid height: {{ windowHeight }}px</span>
            <span>grid width: {{ windowWidth }}px</span>
        </div>
    </div>
</template>