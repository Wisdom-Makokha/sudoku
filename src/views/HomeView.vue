<template>
    <div id="srctag">
        
    </div>    
</template>

<script>
    import sudoku from '../assets/sudoku.js'

    export default{
        data(){
            return{
                difficulty: [20, 29, 38, 47, 56, 64],
            }
        },
        mounted(){
            let board = new sudoku(9, this.difficulty[2]);
            board.createboard();
            board.printgrid();
        }
    }
</script>


<style scoped>

</style>