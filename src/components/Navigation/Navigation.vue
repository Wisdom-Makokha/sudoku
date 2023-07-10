<template>
    <div id="navigationbar">
        <router-link to="/" id="logo">Sudoku</router-link>
        <div id="leftnavbar">
            <router-link to="/rules" id="rules" class="navigationroute">Rules</router-link>
            <router-link to="/about" id="about" class="navigationroute">About</router-link>
        </div>
    </div>
</template>


<style scoped>
    #navigationbar
    {
        display: flex;
        justify-content: space-between;
        background-color: #B8C5D6;
    }

    .navigationroute
    {
        text-decoration: none;
        margin-left: 10px;
    }

    #logo
    {
        text-decoration: none;
    }
</style>

<script>

</script>