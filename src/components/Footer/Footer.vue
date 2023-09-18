<template>
  <div id="footer" class="row-flex">
    <div class="footer-container">
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
</template>

<script>
export default {

}
</script>

<style scoped>
.footer-container {
  width: 100%;
  height: auto;
  bottom: 0;
  position: relative;
  margin-top: 90px;
  border-top: 3px solid rgba(0, 33, 71, 0.6);
  padding: 3em 7em;
  background-color: rgba(3, 37, 74, 0.76);
}

.list-item a {
    text-decoration: none;
    cursor: pointer;
    color: rgb(0, 17, 39);
    text-decoration: underline;
    transition-property: text-decoration, color;
    transition-duration: 0.4s;
    transition-timing-function: linear;
}

.list-item a:hover {
    text-decoration: none;
    color: rgb(80, 149, 241);
}

.normal-text {
    font-size: 150%;
    color: rgb(205, 227, 255)
}

</style>