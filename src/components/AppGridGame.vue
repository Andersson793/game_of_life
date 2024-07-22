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
            gridCols: 50,
            gridRows: 30,
            currentGrid: [],
            nextGrid: [],
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
        }

        this.cell = (a, x, y) => new cell(a, x, y);

        this.start();
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

        getNeighbors(x, y) {
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
                    x + neighbors.x >= 0 &&
                    y + neighbors.y >= 0 &&
                    x + neighbors.x < this.gridCols &&
                    y + neighbors.y < this.gridRows
                ) {
                    const neighborsPosition = {
                        x: x + neighbors.x,
                        y: y + neighbors.y,
                    };

                    arrNeighbors.push(neighborsPosition);
                }
            });

            return arrNeighbors;
        },

        neighborsLivingCount(pX, pY) {
            let neighborsCount = 0;

            const neighbors = this.getNeighbors(pX, pY);

            neighbors.forEach((b) => {
                if (this.currentGrid[b.y][b.x].aLive) {
                    neighborsCount++;
                }
            });

            return neighborsCount;
        },

        generateNewgrid() {
            let that = this;

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
                        this.nextGrid[y][x].aLive = 1;
                    } else if (b.aLive === 0 && neighborsLiving === 3) {
                        this.nextGrid[y][x].aLive = 1;
                    } else if (b.aLive === 1 && neighborsLiving > 3) {
                        this.nextGrid[y][x].aLive = 0;
                    } else if (b.aLive === 1 && neighborsLiving < 2) {
                        this.nextGrid[y][x].aLive = 0;
                    }
                });
            });

            that.currentGrid = this.nextGrid;

            that.nextGrid = this.createGrid();
        },

        start() {
            const that = this;

            const cellSize = {
                width: that.windowWidth / that.gridCols,
                height: that.windowHeight / that.gridRows,
            };

            let setup = (p) =>
                function () {
                    const mycanvas = p.createCanvas(
                        that.windowWidth,
                        that.windowHeight,
                    );

                    p.frameRate(10);
                    p.background(200);

                    that.currentGrid = that.randomizeCells(that.createGrid());
                    that.nextGrid = that.createGrid();

                    mycanvas.parent("canvas");
                };

            let draw = (p) =>
                function () {
                    that.generateNewgrid();

                    that.currentGrid.forEach((a, y) => {
                        a.forEach((b, x) => {
                            const width = x * cellSize.width;
                            const height = y * cellSize.height;

                            if (b.aLive) p.fill(40);
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
    <div id="canvas">
        <div class="bg-black text-green-500 flex justify-around h-7" @click="">
            <span>grid population: {{ this.gridCols * this.gridRows }}</span>
            <span>window height: {{ windowHeight }}px</span>
            <span>window width: {{ windowWidth }}px</span>
        </div>
    </div>
</template>
