<template>
  <section class="section">
    <div class="box">
      <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa">
        </div>
        <div class="column">
          <div class="is-flex is-align-items-center is-justify-content-space-around">
            <section><strong>{{ timeFormat }}</strong></section>
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

function pad(n, z) {
  return (`00${n}`).slice(-(z || 2));
}

const timeFormat = computed(() => {
  let s = counter.value;
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
});

</script>

<style></style>
