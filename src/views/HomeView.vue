<template>
    <div id="srctag">
        <div class="home-view">
            <div class="table-position">
               <div class="table">
                <div class="row flex-center" v-for="row in boardsize" :key="row">
                    <div class="column flex-center" v-for="column in boardsize" :key="column">
                        <span class="cell"><input type="text" maxlength="1" class="grid-cell" v-model="board.sudokugrid[row - 1][column - 1]"></span>
                    </div>
                </div>
               </div>
            </div>
        </div>
    </div>    
</template>

<script>
    import sudoku from '../assets/sudoku.js'
    import axios from 'axios'

    export default{
        data(){
            return{
                difficulty: [20, 29, 38, 47, 56, 64],
                string:"",
                boardsize: 9,
                board: () => new sudoku(this.boardsize, this.difficulty[5]),
                level: 2
            }
        },
        created(){
            this.board = new sudoku(this.boardsize, this.difficulty[this.level]);
            this.board.createboard();
            this.board.printgrid();
        },
        methods: {
            setdifficulty(level){
                this.level = level;
            }
        },
        mounted() {
            const gridcells = document.getElementsByClassName("grid-cell");

            for(let i = 0; i < gridcells.length; i++)
            {
                if(gridcells[i].value > 0)
                    gridcells[i].setAttribute("readonly", "");
            }
        }
    }
</script>


<style scoped>
.table {
    background-color: white;
    width: fit-content;
    height: fit-content;
}

.flex-center {
    display: flex;
    justify-content: center;
}

.row{
    flex-direction: row;
}

.column {
    flex-direction: column;
}

.cell{
    display: inline block;
    overflow: hidden;
    border: 1px solid #02214d79;
    height: 5em;
    max-width: 5em;
    caret-color: transparent;
}

.column:first-child {
    border-left: solid #02214dd3;
}

.column:nth-child(3n) {
    border-right: solid #02214d79;
}

.column:last-child {
    border-right: solid #02214dd3;
}

.row:first-child {
    border-top: solid #02214dd3;
}

.row:nth-child(3n) .cell {
    border-bottom: solid #02214d79;
}

.row:last-child {
    border-bottom: solid #02214dd3
}

.cell input{
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    cursor: pointer;
    font-size: 230%;
    font-family: 'Playfair Display', serif;
}

</style>