<template>
  <div class="is-flex is-align-items-center is-justify-content-space-around">
    <cronometro-view :counter="counter"></cronometro-view>
    <counter-button :action="'play'" :onClickAction="startCounter" :isDisabled="isCounterRunning"/>
    <counter-button :action="'stop'" :onClickAction="endCounter" :isDisabled="isCounterRunning"/>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import CronometroView from './CronometroView.vue';
import CounterButton from './CounterButton.vue';

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
