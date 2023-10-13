<template>
  <div id="boards-page" >
    <div class="boards-container" v-for="board in boards" :key="board.id">
        <div v-if="zeroboards" class="not-found">
            <p class="normal-text">No boards here</p>
        </div>
        <div v-else class="board-details">
            <span class="board-text difficulty">{{ difficulty[board.difficulty] }}</span>
            <span class="board-text time">{{ board.time_taken }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data (){
        return {
            baseURL: "http://127.0.0.1:8000/api",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("logintoken")}`,
                Accept: "application/json"
            },
            count: 0,
            zeroboards: true,
            boards: [],
            errors: [],
            difficulty: [
                "easy",
                "medium",
                "hard",
                "expert",
                "nightmare",
                "Robot"
            ]
        }
    },
    async mounted (){
        try {
            const response  = await axios.get(this.baseURL + "/getUserSudokus", {headers: this.headers});
            this.boards = response.data.requestdata;

            if(this.boards.length > 0)
                this.zeroboards = false;
        } catch(error) {
            this.errors.push(error);
        }
    }
}
</script>

<style>
.board-text{
    font-size: 200%
}

.board-details{
    padding: 0.9em 3em;
    border: 1px solid;
    margin: 6px 0px;
    border-radius: 10px;
}
</style>