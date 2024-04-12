<template>
  <section class="section">
    <div class="box">
      <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa">
        </div>
        <div class="column">
          <div class="is-flex is-align-items-center is-justify-content-space-around">
            <cronometro-view :counter="counter"></cronometro-view>
            <button class="button" @click.prevent="startCounter">
              <span class="icon"><i class="fas fa-play"></i></span>
            </button>
            <button class="button" @click.prevent="endCounter"><span class="icon"><i class="fas fa-stop"></i></span></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import CronometroView from './CronometroView.vue';

const todoItem = ref('');
const counter = ref(0);
const cronometroReference = ref(0);

const INCREMENT = 1000;
function startCounter() {
  cronometroReference.value = setInterval(() => {
    counter.value += INCREMENT;
  }, INCREMENT);
}

function endCounter() {
  clearInterval(cronometroReference.value);
}

</script>

<style></style>
