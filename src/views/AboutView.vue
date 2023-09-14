<template>
    <div id="about-page">
        <div class="about-container">
            <div class="header-container">
                <h1 class="header-text">About Sudoku</h1>
            </div><br>
            <div class="about-text">
                <p class="normal-text">Welcome to my Sudoku Website, the ultimate website for sudoku lovers! Whether you are
                    a beginner or a master,
                    you will find something to enjoy here. This website offers you:</p><br>
                <ul>
                    <li class="normal-text list-item">Thousands of puzzles in different levels of difficulty, from easy to
                        expert.</li>
                    <li class="normal-text list-item">A daily challenge with a leaderboard and prizes.</li>
                    <li class="normal-text list-item">A blog with tips, tricks and strategies for improving your sudoku
                        skills.</li>
                </ul><br><br>
                <p class="normal-text">Sudoku is a great way to
                    exercise your brain, relax
                    your mind and have fun. This website is here to support you on your sudoku journey and make it more
                    enjoyable.
                    Join us today and discover the world of sudoku!
                </p><br><br>
                <p class="normal-text">This website was made with alot of reference from various sources. Taking inspiration
                    from their ideas and implementations. These are:</p>
                <ul>
                    <li class="normal-text list-item"><a href="https://sudoku.com/sudoku-rules/">Sudoku.com:</a> for most of
                        the design inspiration</li>
                    <li class="normal-text list-item">Geeks for geeks for the <a
                            href="https://www.geeksforgeeks.org/sudoku-backtracking-7/">solver logic</a> and <a
                            href="https://www.geeksforgeeks.org/program-sudoku-generator/">board generation logic</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 50px 3em;
}

.header-container {
    text-align: center;
    width: 100%;
    border: 2px solid #02214d79;
    border-radius: 10px;
    background-color: rgba(0, 33, 71, 0.346)
}

.normal-text {
    font-size: 200%
}

.list-item {
    font-size: 180%;
    text-indent: 5%;
    list-style-position: inside;
}

.list-item a {
    text-decoration: none;
    cursor: pointer;
    color: rgb(7, 84, 186);
    text-decoration: underline;
    transition-property: text-decoration;
    transition-duration: 0.4s;
    transition-timing-function: linear;
}

.list-item a:hover {
    text-decoration: none;
}
</style>

<script>

</script>