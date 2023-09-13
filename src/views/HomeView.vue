<template>
    <div id="srctag">
        <div class="home-view flex-center">
            <div class="difficulty-selection flex-center">
                <div class="option-container flex-center">
                    <input type="radio" id="easy" name="difficulty" value="0" checked @click="setdifficulty(0)"/>
                    <label for="easy">Easy</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="medium" name="difficulty" value="1" @click="setdifficulty(1)" />
                    <label for="medium">Medium</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="hard" name="difficulty" value="2" @click="setdifficulty(2)" />
                    <label for="hard">Hard</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="expert" name="difficulty" value="3" @click="setdifficulty(3)" />
                    <label for="expert">Expert</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="nightmare" name="difficulty" value="4" @click="setdifficulty(4)" />
                    <label for="nightmare">Nightmare</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="robot" name="difficulty" value="5" @click="setdifficulty(5)" />
                    <label for="robot">Robot</label>
                </div>
            </div>
            <div class="table-position flex-center">
                <div class="table">
                    <div class="row flex-center" v-for="row in boardsize" :key="row">
                        <div class="column flex-center" v-for="column in boardsize" :key="column">
                            <span class="cell"><input type="text" maxlength="1" class="grid-cell cell-transition" 
                                    @input="validatevalue(row, column)"
                                    v-model="board.sudokugrid[row - 1][column - 1]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './view_assets/home_styles.css'
import sudoku from '../assets/sudoku.js'
import axios from 'axios'

export default {
    data() {
        return {
            baseURL: "http://127.0.0.1:8000/api",
            difficulty: [24, 29, 38, 47, 56, 64],
            string: "",
            boardsize: 9,
            board: () => new sudoku(this.boardsize, this.difficulty[5]),
            numberregex: new RegExp(/[1-9]/)
        }
    },
    created() {
        //this section initializes the board when the website is created
        this.board = new sudoku(this.boardsize, this.difficulty[0]);
        this.board.createboard();
    },
    methods: {
        //function for the difficulty selection
        setdifficulty(level) {
            this.board = new sudoku(this.boardsize, this.difficulty[level]);
            this.board.createboard();
        },
        /**function to validate a value and make sure it is not: 
         * a character
         * check sudoku rules
         */
        validatevalue(row, column) {
            let gridcell = document.querySelectorAll(`.row-${row}.column-${column}`);
            let value = this.board.sudokugrid[row - 1][column - 1];

            if (!this.numberregex.test(value))
            {
                this.board.sudokugrid[row - 1][column - 1] = undefined;
                return;
            }
            
            if(!this.board.checkassignmentvalid(row - 1, column - 1, value))
            {
                gridcell[0].classList.remove("cell-transition");
                gridcell[0].classList.add("cell-error");
            }
            else if(gridcell[0].classList.contains("cell-error"))
            {
                gridcell[0].classList.remove("cell-error");
                gridcell[0].classList.add("cell-transition");
            }

            console.log(gridcell[0].classList.contains("cell-error"));

            console.log(gridcell[0].value)
        }
    },
    mounted() {
        const gridcells = document.getElementsByClassName("grid-cell");

        let k;

        for (let i = 0; i < gridcells.length; i++) {
            if (gridcells[i].value >= 1 && gridcells[i] <= 9)
                gridcells[i].setAttribute("readonly", "");
        }

        for (let i = 1, k = 0; i <= this.boardsize; i++) {
            for (let j = 1; j <= this.boardsize; j++, k++)
                gridcells[k].classList.add("row-" + i, "column-" + j)
        }
    }
}
</script>


<style scoped>
</style>