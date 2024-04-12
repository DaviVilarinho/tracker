<template>
  <section class="section">
    <div class="box">
      <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa" :value="todoItem">
        </div>
        <div class="column">
          <timer-tracker></timer-tracker>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TimerTracker from './TimerTracker.vue';

const todoItem = ref('');
</script>

<style></style>
