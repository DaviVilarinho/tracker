<template>
  <div class="is-flex is-align-items-center is-justify-content-space-around">
    <cronometro-view :counter="counter"></cronometro-view>
    <button class="button" @click.prevent="startCounter" :disabled="isCronometerRunning">
      <span class="icon">
        <i class="fas fa-play" />
      </span>
    </button>
    <button class="button" @click.prevent="endCounter" :disabled="!isCronometerRunning">
      <span class="icon">
        <i class="fas fa-stop" />
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import CronometroView from './CronometroView.vue';

const counter = ref(0);
const cronometroReference = ref(0);
const isCronometerRunning = ref(false);

const INCREMENT = 1000;
function startCounter() {
  if (!isCronometerRunning.value) {
    cronometroReference.value = setInterval(() => {
      counter.value += INCREMENT;
    }, INCREMENT);
    isCronometerRunning.value = true;
  }
}

const emit = defineEmits(['endCounter']);

function endCounter() {
  if (isCronometerRunning.value) {
    clearInterval(cronometroReference.value);
    isCronometerRunning.value = false;
    emit('endCounter', counter.value);
    counter.value = 0;
  }
}
</script>
