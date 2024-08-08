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
            gridSize: 800,
            gridCols: 30,
            gridRows: 30,
            currentGrid: [],
            nextGrid: [],
            cell: {},
            s: undefined,
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
        randomizeCells() {
            const g = this.createGrid();

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

        //randomize cells
        random() {
            this.s.noLoop();

            this.currentGrid = this.randomizeCells();

            this.s.loop();
        },

        //stop or restart grid frames
        stop_restart() {
            if (this.s.isLooping()) {
                this.s.noLoop();
            } else {
                this.s.loop();
            }
        },

        //adds and removes columns and rows from the grid
        addGridCells() {
            this.s.noLoop();

            this.gridCols++;
            this.gridRows++;
            this.currentGrid = this.randomizeCells();
            this.nextGrid = this.createGrid();

            this.s.clear();
            this.s.redraw();

            this.s.loop();
        },

        reduceGridCells() {
            this.s.noLoop();

            this.gridCols--;
            this.gridRows--;
            this.currentGrid = this.randomizeCells();
            this.nextGrid = this.createGrid();

            this.s.clear();
            this.s.redraw();

            this.s.loop();
        },

        generateNewgrid() {
            let that = this;

            that.currentGrid.forEach((a, y) => {
                a.forEach((b, x) => {
                    const neighborsLiving = that.neighborsLivingCount(
                        b.position.x,
                        b.position.y,
                    );

                    //game of life roles
                    if (
                        (b.aLive === 1 && neighborsLiving === 2) ||
                        neighborsLiving === 3
                    ) {
                        this.nextGrid[y][x].aLive = 1;
                    }

                    if (b.aLive === 0 && neighborsLiving === 3) {
                        this.nextGrid[y][x].aLive = 1;
                    }

                    if (b.aLive === 1 && neighborsLiving > 3) {
                        this.nextGrid[y][x].aLive = 0;
                    }

                    if (b.aLive === 1 && neighborsLiving < 2) {
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
                    const size = 600;
                    const mycanvas = p.createCanvas(
                        that.gridSize,
                        that.gridSize,
                    );

                    p.frameRate(10);

                    that.currentGrid = that.randomizeCells();
                    that.nextGrid = that.createGrid();

                    mycanvas.position(
                        this.windowWidth / 2 - that.gridSize / 2,
                        this.windowHeight / 2 - that.gridSize / 2,
                        "relative",
                    );

                    mycanvas.parent("canvas");
                };

            let draw = (p) =>
                function () {
                    that.generateNewgrid();

                    const t = that.gridSize / that.gridCols;

                    that.currentGrid.forEach((a, y) => {
                        a.forEach((b, x) => {
                            if (b.aLive) {
                                p.fill(30);
                            } else {
                                p.fill(220);
                            }

                            p.square(x * t, y * t, t);
                        });
                    });
                };

            //create a p5 instance
            const instance = (p) => {
                this.s = p;
                this.s.setup = setup(this.s);
                this.s.draw = draw(this.s);
            };

            //create a canvas
            const myCanvas = new p5(instance);
        },
    },
};
</script>
<template>
    <div id="canvas">
        <div
            class="bg-black text-green-500 flex justify-around items-center h-8 uppercase text-sm"
            @click=""
        >
            <span>Grid cells: {{ this.gridCols * this.gridRows }}</span>
            <span>Grid cols: {{ this.gridCols }}</span>
            <div>
                <span
                    class="w-10 h-5 hover:bg-gray-50/10 rounded-sm text-center cursor-pointer text-2xl select-none"
                    @click="this.reduceGridCells()"
                >
                    -
                </span>
                <span
                    class="p-3 hover:bg-gray-50/10 rounded-sm text-center cursor-pointer text-2xl select-none"
                    @click="this.addGridCells()"
                >
                    +
                </span>
            </div>

            <span>|</span>

            <span>Grid rows: {{ this.gridRows }}</span>
            <span class="cursor-pointer" @click="this.random()"> random </span>
            <span class="cursor-pointer" @click="this.stop_restart()">[]</span>
        </div>
    </div>
</template>
