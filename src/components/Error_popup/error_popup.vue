<template>
    <div id="popup-container">
        <div class="popup">
            <span class="popup-text normal-text">
                <slot>We are experiencing an error....</slot>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:['error']
}
</script>



<style scoped>
#pop-container{
    position: relative;
    display: inline block;
}

.popup {
    position: absolute;
    max-width: 60%;
    width: fit-content;
    min-width: 30%;
    cursor: pointer;
    height: auto;
    padding: 3em 6em;
    text-align: center;
    top: 50%;
    left: 33%;
    z-index: 4;
    border: 2px solid;
    border-radius: 10px;
    box-shadow: 1px 3px 10px rgba(129, 6, 6, 0.915);
    background-color: rgba(238, 95, 95, 0.853);
}
</style>