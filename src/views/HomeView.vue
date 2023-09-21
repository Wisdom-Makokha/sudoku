<template>
    <div id="srctag">
        <errorpopup v-show="newerror" @click="closepopup">{{ errors }}</errorpopup>
        <div class="home-view flex-center">
            <div class="difficulty-selection flex-center">
                <div class="option-container flex-center">
                    <input type="radio" id="easy" name="difficulty" value="0" v-model="newlevel"
                        @click="setdifficulty(0)" />
                    <label for="easy">Easy</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="medium" name="difficulty" value="1" v-model="newlevel"
                        @click="setdifficulty(1)"/>
                    <label for="medium">Medium</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="hard" name="difficulty" value="2" v-model="newlevel"
                        @click="setdifficulty(2)" />
                    <label for="hard">Hard</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="expert" name="difficulty" value="3" v-model="newlevel"
                        @click="setdifficulty(3)" />
                    <label for="expert">Expert</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="nightmare" name="difficulty" value="4" v-model="newlevel"
                        @click="setdifficulty(4)" />
                    <label for="nightmare">Nightmare</label>
                </div>
                <div class="option-container flex-center">
                    <input type="radio" id="robot" name="difficulty" value="5" v-model="newlevel"
                        @click="setdifficulty(5)" />
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
            <timer />
        </div>
    </div>
</template>

<script>
import './view_assets/home_styles.css'
import sudoku from '../assets/sudoku.js'
import axios from 'axios'
import errorpopup from '../components/Error_popup/error_popup.vue'
import timer from '../components/timer/timer.vue'

export default {
    components:{
        errorpopup,
        timer,
    },
    data() {
        return {
            baseURL: "http://127.0.0.1:8000/api",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("logintoken")}`,
                Accept: "application/json"
            },
            difficulty: [24, 29, 38, 47, 56, 64],
            newlevel: 0,
            string: "",
            boardsize: 9,
            board: () => new sudoku(this.boardsize, this.difficulty[5]),
            numberregex: new RegExp(/[1-9]/),
            checklogin: localStorage.getItem("logintoken") ? true : false,
            gameid: 0,
            recentgame: undefined,
            submitgame: {
                id: 0,
                boards: "",
                difficulty: 0,
                time_taken: 0,
                completed: false
            },
            errors: "",
            newerror: false,

        }
    },
    created() {
        //this section initializes the board when the website is created
        this.board = new sudoku(this.boardsize, this.difficulty[0]);

        if (this.checklogin)
            this.getrecentgame();
        else
            this.board.createboard();
    },
    methods: {
        //function for the difficulty selection
        setdifficulty(level) {
            this.board = new sudoku(this.boardsize, this.difficulty[level]);
            this.newlevel = level;
            this.board.createboard();

            if (this.checklogin)
                this.createsudoku();
        },
        /**function to validate a value and make sure it is not: 
         * a character
         * check sudoku rules
         */
        validatevalue(row, column) {
            let gridcell = document.querySelectorAll(`.row-${row}.column-${column}`);
            let value = this.board.sudokugrid[row - 1][column - 1];

            if (!this.numberregex.test(value))
                this.board.sudokugrid[row - 1][column - 1] = undefined;

            value = parseInt(value);

            if (!this.board.checkassignmentvalid(row - 1, column - 1, value)) {
                gridcell[0].classList.remove("cell-transition");
                gridcell[0].classList.add("cell-error");
            }
            else if (gridcell[0].classList.contains("cell-error")) {
                gridcell[0].classList.remove("cell-error");
                gridcell[0].classList.add("cell-transition");
            }

            if (this.checklogin)
                this.updatesudoku();
        },
        //function to get the most recent game played from the database for the user
        async getrecentgame() {
            try {
                const response = await axios.get(this.baseURL + "/getRecentGame", { headers: this.headers });

                this.recentgame = response.data.requestdata;
                this.board.stringtogrid(this.recentgame.boards);
                this.newlevel = this.recentgame.difficulty;
                this.totaltime = this.recentgame.time_taken;
                this.seconds = this.totaltime % 60;
                this.minutes = (this.totaltime - (this.totaltime % 60)) / 60;
                this.gameid = this.recentgame.id;
            } catch (error) {
                this.errors = error.response.data.message;
                this.displaypopup();
                this.board.createboard();
                this.createsudoku();
            }
        },
        //this function loads the details into the submit game vairable
        submitgamedata() {
            this.submitgame.boards = this.board.gridtostring();
            this.submitgame.completed = this.board.checkcomplete();
            this.submitgame.time_taken = this.totaltime;
            this.submitgame.difficulty = this.newlevel;
            this.submitgame.id = this.gameid;
        },
        //function to make a new record in the database for a sudoku board
        async createsudoku() {
            this.submitgamedata();

            try {
                const response = await axios.post(this.baseURL + '/createSudoku', this.submitgame, { headers: this.headers });
                this.gameid = response.data.requestdata.id;
            } catch (error) {
                this.errors = error.response.data.message;
                this.displaypopup();
            }
        },
        //function to update the database record, the function runs whenever the user enters a new number in the board
        async updatesudoku() {
            this.submitgamedata();
            try {
                const response = await axios.put(this.baseURL + '/updateSudoku', this.submitgame, { headers: this.headers });
                // console.log(response.data.requestdata);
            } catch (error) {
                this.errors = error.response.data.message;
                this.displaypopup();
            }
        },
    },
    mounted() {
        //this sets up the site to make cells containing initail clues readonly
        const gridcells = document.getElementsByClassName("grid-cell");
        let k;
        //this loop sets all the preset numbers to readonly to prevent them from changing 
        for (let i = 0; i < gridcells.length; i++) {
            if (gridcells[i].value >= 1 && gridcells[i] <= 9)
                gridcells[i].setAttribute("readonly", "");
        }

        for (let i = 1, k = 0; i <= this.boardsize; i++) {
            for (let j = 1; j <= this.boardsize; j++, k++) {
                gridcells[k].classList.add("row-" + i, "column-" + j)

                if (!this.board.checkassignmentvalid(i - 1, j - 1, gridcells[k].value)) {
                    gridcells[k].classList.remove("cell-transition");
                    gridcells[k].classList.add("cell-error");
                }
                else if (gridcells[k].classList.contains("cell-error")) {
                    gridcells[k].classList.remove("cell-error");
                    gridcells[k].classList.add("cell-transition");
                }
            }
        }
    }
}
</script>


<style scoped></style>