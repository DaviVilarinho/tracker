<template>
  <section class="section">
    <div class="box">
      <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa" v-model="itemDescription">
        </div>
        <div class="column">
          <timer-tracker @end-counter="onEndCounter"></timer-tracker>
        </div>
      </div>
      <done-todo v-for="(item, i) in doneItems" :key="i" :item="item"/>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type TodoItem from '@/interfaces/TodoItem';
import TimerTracker from './TimerTracker.vue';
import DoneTodo from './DoneTodo.vue';

const itemDescription = ref<string>('');

const doneItems = ref(new Array<TodoItem>());

function onEndCounter(counter: number) {
  doneItems.value.push({
    name: itemDescription.value,
    counterTime: counter,
  } as TodoItem);
  itemDescription.value = '';
}
</script>

<style></style>
