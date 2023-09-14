<template>
    <div id="rules-page">
        <div class="rules-n-tips-container container">
            <div class="header-container container rules-n-tips-header-container">
                <h1 class="header-text">Rules and tips</h1>
            </div>
            <div class="rules-container container">
                <div class="rules-header-container header-container">
                    <h2 class="header-text">Rules</h2>
                </div>
                <div class="r-n-t-text ">
                    <ul>
                        <li class="normal-text list-item">Sudoku is a logic based game that involves filling a 9 X 9 grid
                            with digits from 1 to 9
                        </li>
                        <li class="normal-text list-item">You can use only numbers from 1 to 9</li>
                        <li class="normal-text list-item">The grid is divided into nine vertical columns, nine horizontal
                            rows and nine 3 x 3 subgrids
                            called regions, each containing 9 cells</li>
                        <li class="normal-text list-item">Each vertical column can only contain numbers from 1 to 9</li>
                        <li class="normal-text list-item">Each horizontal row can only contain numbers from 1 to 9</li>
                        <li class="normal-text list-item">Each region can only contain numbers from 1 to 9</li>
                        <li class="normal-text list-item">Each number in a region, vertical column or horizontal row can
                            only be used once</li>
                        <li class="normal-text list-item">The board will have some digits already fillled as clues</li>
                        <li class="normal-text list-item">The difficulty of the game depends on the number of clues given
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tips-container container">
                <div class="tips-header-container header-container">
                    <h2 class="header-text">Tips</h2>
                </div>
                <div class="r-n-t-text">
                    <ul>
                        <li class="normal-text list-item">Numbers cannot repeat in a row, column or region. This means a
                            number appearing anywhere eliminates that number from its row, column or region</li>
                        <li class="normal-text list-item">Start by looking for cells that have only one possible digit,
                            based on the clues and rules of the game. For example, if a cell is in a row, column or region
                            that already has eight digits filled, then the remaining digit must go in that cell.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.rules-n-tips-container {
    padding: 50px 3em;
}

.header-container {
    margin-top: 10px;
    width: 100%;
    border: 2px solid #02214d79;
    border-radius: 10px;
    background-color: rgba(0, 33, 71, 0.346);
    padding: 5px 4em ;
}

.rules-n-tips-header-container{
    text-align: center;
}

.r-n-t-text {
    padding: 0px 4em
}

.normal-text {
    font-size: 200%
}

.list-item {
    font-size: 180%;
    margin: 1em 0;
    list-style-position: inside;
}
</style>