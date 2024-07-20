<script>
import p5 from "p5";
import { useStore } from "../store/pinia";

export default {
    data() {
        return {
            store: useStore(),
            windowWidth: document.body.clientWidth,
            windowHeight: document.body.clientHeight - 32,
            gridPopulation: useStore().gridPopulation,
            gridCols: 10,
            gridRows: 10,
            currentGrid: [],
            //nextGrid: [],
            cell: {},
        };
    },

    mounted() {
        class cell {
            constructor(a, x, y) {
                (this.aLive = a),
                    (this.position = {
                        x: x,
                        y: y,
                    });
            }

            get getNeighbors() {
                const arrNeighbors = new Array();

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
                        /*
                        this.position.x + neighbors.x >= 0 &&
                        this.position.y + neighbors.y >= 0 &&
                        this.position.x + neighbors.x < this.gridCols &&
                        this.position.y + neighbors.y < this.gridRows

                        */

                        true
                    ) {
                        const neighborsPosition = {
                            x: this.position.x + neighbors.x,
                            y: this.position.y + neighbors.y,
                        };

                        arrNeighbors.push(neighborsPosition);
                    }
                });

                return arrNeighbors;
            }
        }

        this.cell = (a, x, y) => new cell(a, x, y);

        this.start();

        console.log(this.cell(1, 0, 0).getNeighbors);
    },

    methods: {
        randomizeCells(grid) {
            const g = grid;

            g.forEach((a, y) => {
                a.forEach((b, x) => {
                    b.aLive = Math.floor(Math.random() * 2);
                });
            });

            return g;
        },

        createGrid() {
            const model = new Array();

            for (let y = 0; y < this.gridRows; y++) {
                const row = new Array();

                for (let x = 0; x < this.gridCols; x++) {
                    const b = this.cell(0, x, y);

                    row.push(b);
                }

                model.push(row);
            }

            return model;
        },

        neighborsLivingCount(pX, pY) {
            let neighborsCount = 0;

            const neighbors = this.cell(0, pX, pY).getNeighbors;

            neighbors.forEach((b) => {
                if (this.currentGrid[b.y][b.x].aLive) {
                    neighborsCount++;
                }
            });

            return neighborsCount;
        },

        generateNewgrid() {
            let that = this;

            let nextGrid = this.createGrid();

            that.currentGrid.forEach((a, y) => {
                a.forEach((b, x) => {
                    const neighborsLiving = that.neighborsLivingCount(
                        b.position.x,
                        b.position.y,
                    );

                    if (
                        (b.aLive === 1 && neighborsLiving === 2) ||
                        neighborsLiving === 3
                    ) {
                        nextGrid[y][x].aLive = 1;
                    } else if (b.aLive === 0 && neighborsLiving === 3) {
                        nextGrid[y][x].aLive = 1;
                    } else if (b.aLive === 1 && neighborsLiving > 3) {
                        nextGrid[y][x].aLive = 0;
                    } else if (b.aLive === 1 && neighborsLiving < 2) {
                        nextGrid[y][x].aLive = 0;
                    }
                });
            });

            //that.currentGrid = nextGrid;

            nextGrid = this.createGrid();

            return nextGrid;
        },

        start() {
            const that = this;

            const cellSize = {
                width: that.windowWidth / that.gridCols,
                height: that.windowHeight / that.gridRows,
            };

            let setup = (p) =>
                function () {
                    //const mycanvas = p.createCanvas(this.windowWidth, this.windowHeight)
                    const mycanvas = p.createCanvas(600, 600);

                    //p.frameRate(2000);
                    p.background(200);

                    that.currentGrid = that.randomizeCells(that.createGrid());
                    that.nextGrid = that.createGrid();

                    mycanvas.parent("conteiner");
                };

            let draw = (p) =>
                function () {
                    that.generateNewgrid();

                    that.currentGrid.forEach((a, y) => {
                        a.forEach((b, x) => {
                            const width = x * cellSize.width;
                            const height = y * cellSize.height;

                            if (b.aLive) p.fill(155);
                            else p.fill(250);

                            p.rect(
                                width,
                                height,
                                that.windowWidth,
                                that.windowHeight,
                            );
                        });
                    });
                };

            var instance = (p) => {
                p.setup = setup(p);
                p.draw = draw(p);
            };

            new p5(instance);
        },
    },

    updated() {
        console.log("Updated");
    },
};
</script>
<template>
    <div id="conteiner">
        <div class="bg-black text-green-500 flex justify-around py-1" @click="">
            <span>grid population: {{ store.gridPopulation }}</span>
            <span>grid height: {{ windowHeight }}px</span>
            <span>grid width: {{ windowWidth }}px</span>
        </div>
    </div>
</template>
