<template>
  <div id="boards-page" >
    <div class="boards-container" v-for="board in boards" :key="board.id">
        <div v-if="zeroboards" class="not-found">
            <p class="normal-text">No boards here</p>
        </div>
        <div v-else>
            <span>{{ difficulty[board.difficulty] }}</span>
            <span>{{ board.time_taken }}</span>
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

</style>