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
            gridCols: 0,
            gridRows: 0,
            currentGrid: [],
            nextGrid: [],
            cell: {}
        }
    },

    mounted() {

        const setup = (p) => {

            //const mycanvas = p.createCanvas(this.windowWidth, this.windowHeight)
            const mycanvas = p.createCanvas(300, 500)

            p.frameRate(10);
            p.background(190)

            mycanvas.parent('conteiner')

        }

        const draw = (p) => {

            this.currentGrid.forEach((a, y) => {

                a.forEach((b, x) => {

                    /*

                    if (b.aLive)
                        p.fill(155)
                    else
                        p.fill(250)
                
                    */

                    p.fill(170)
                    p.rect(1, 2, 3, 4)

                })
            })

        }

        const intance = (p) => {

            p.setup = setup(p)
            p.draw = draw(p)
        }

        new p5(intance);

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

            console.log(g)
        },

        createGrid(){

            const model = new Array

            for (let y = 0; y < this.gridRows; y++) {

                const row = new Array

                for (let x = 0; x < this.gridCols; x++) {

                    const b = this.cell(0,x,y)
                    
                    row.push(b)
                    
                }

                model.push(row)
                
            }

            console.log(model)

            return model;
        },

        neighborsLivingCount(pX,pY) {

            let neighborsCount = 0;

            const neighbors = this.cell(0,pX,pY).getNeighbors

            neighbors.forEach(b => {

                if (this.currentGrid[b.y][b.x].aLive === 1) {
                    neighborsCount++
                }

            });

            console.log(neighborsCount)

            return neighborsCount;
        },

        generateNewgrid() {

            this.currentGrid.forEach((a, y) => {
                a.forEach((b, x) => {
                    
                    const neighborsLiving = this.neighborsLivingCount(b.position.x, b.position.y)

                    if (b.aLive === 1 && neighborsLiving === 2 || neighborsLiving === 3)
                    {
                        this.nextGrid[y][x].aLive = 1
                    }else if(b.aLive === 0 && neighborsLiving === 3)
                    {
                        this.nextGrid[y][x].aLive = 1
                    }else if(b.aLive === 1 && neighborsLiving > 3)
                    {
                        this.nextGrid[y][x].aLive = 0
                    }else if(b.aLive === 1 && neighborsLiving < 2)
                    {
                        this.nextGrid[y][x].aLive = 0
                    }

                });
            });

            this.currentGrid = this.nextGrid;
            
            console.log(this.currentGrid)

            this.nextGrid = this.createGrid();

            console.log('função chamada')

        },

        test(){
            console.log('test de chamada')
        },

        renderGrid () {

            const cellSize = {
                width: this.windowWidth / this.gridCols,
                height: this.windowHeight / this.gridRows
            }

            const setup = (p) => {

                //const mycanvas = p.createCanvas(this.windowWidth, this.windowHeight)
                const mycanvas = p.createCanvas(500, 500)

                p.frameRate(10);
                p.background(200)

                mycanvas.parent('conteiner')

            }

            const draw = (p) => {

                this.currentGrid.forEach((a, y) => {

                    a.forEach((b, x) => {

                        const width = x * cellSize.width;
                        const height = y * cellSize.height;


                        if (b.aLive)
                            p.fill(155)
                        else
                            p.fill(250)
                    

                        p.rect(width, height, this.windowWidth, this.windowHeight)

                    })
                })
            }

            let instance = (p) => {

                p.setup = setup(p)
                p.draw = draw(p)
                this.generateNewgrid()
                this.test()

            }

            new p5(instance);
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