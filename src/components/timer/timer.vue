<template>
    <div id="timer">
        <div class="timer-container flex-center">
            <span id="minutes" class="header-text time-unit">{{ minutes }}</span>
            <span class="header-text">:</span>
            <span id="seconds" class="header-text time-unit">{{ seconds }}</span>
            <button id="startbutton" @click="starttimer" class="button" :disabled="timer">
                <span class="material-symbols-outlined">play_circle</span>
            </button>
            <button id="stopbutton" @click="stoptimer" class="button" :disabled="pausetimer">
                <span class="material-symbols-outlined">pause_circle</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            minutes: 0,
            seconds: 0,
            minstrings: "",
            secstrings: "",
            totaltime: 0,
            timer: true,
            pausetimer: false,
        }
    },
    methods:{
        stopwatch(){
            if(this.timer){
                this.seconds++;
                this.totaltime++;
                if(this.seconds === 60)
                {
                    this.minutes++;
                    this.seconds = 0;
                }

                this.minutes = this.minutes.toString().padStart(2, "0");
                this.seconds = this.seconds.toString().padStart(2, "0");

                setTimeout(this.stopwatch, 1000);
            }
        },
        starttimer(){
            this.timer = true;
            this.pausetimer = false;
            this.stopwatch();
        },
        stoptimer(){
            this.timer = false;
            this.pausetimer = true;
        }
    },
    mounted(){
        this.stopwatch();
    }
}
</script>

<style scoped>

.timer-container {
    width: 14em;
    margin-top: 1em;
    padding: 6px 10px;
    border: 2px solid #02214d79;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 33, 71, 0.346)
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.button {
    background-color: transparent;
    border: none;
}

.time-unit {
    margin: 0px 5px;
    width: 33%
}
</style>