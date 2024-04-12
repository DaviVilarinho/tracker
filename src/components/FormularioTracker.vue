<template>
  <section class="section">
    <div class="box entire-form">
      <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input input-colored" placeholder="Tarefa a iniciar" aria-label="Tarefa" v-model="itemDescription">
        </div>
        <div class="column">
          <timer-tracker @end-counter="onEndCounter"></timer-tracker>
        </div>
      </div>
      <template v-if="doneItems.length > 0">
        <done-todo v-for="(item, i) in doneItems" :key="i" :item="item"/>
      </template>
      <box-vue v-else>Nenhuma tarefa foi realizada</box-vue>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type TodoItem from '@/interfaces/TodoItem';
import TimerTracker from './TimerTracker.vue';
import DoneTodo from './DoneTodo.vue';
import BoxVue from './BoxVue.vue';

const itemDescription = ref<string | undefined>(undefined);

const doneItems = ref(new Array<TodoItem>());

function onEndCounter(counter: number) {
  doneItems.value.push({
    name: itemDescription.value,
    counterTime: counter,
  } as TodoItem);
  itemDescription.value = undefined;
}
</script>

<style scoped>
.entire-form {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario);
}

.input-colored {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario) !important;
}

.input-colored::placeholder {
  color: var(--texto-fraco) !important;
}
</style>
