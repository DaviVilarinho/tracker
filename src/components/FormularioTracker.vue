<template>
  <section class="section">
    <div class="box entire-form">
      <div class="columns">
        <div class="column is-6" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input input-colored" placeholder="Tarefa a iniciar" aria-label="Tarefa"
            v-model="itemDescription">
        </div>
        <div class="column is-3">
          <div class="select">
            <select v-model="selectedProjectId" aria-label="Selecionar ID Projeto Relacionado à Tarefa">
              <option value="">Projeto</option>
              <template v-for="([id, project], i) in projects" :key="id">
                <option :value="id">{{ project.name }}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="column">
          <timer-tracker @end-counter="onEndCounter"></timer-tracker>
        </div>
      </div>
      <template v-if="doneItems.length > 0">
        <done-todo v-for="(item, i) in doneItems" :key="i" :item="item" />
      </template>
      <box-vue v-else>Nenhuma tarefa foi realizada</box-vue>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type TodoItem from '@/interfaces/ITodoItem';
import { key, NOTIFICAR } from '@/store';
import { useStore } from 'vuex';
import Project from '@/interfaces/IProject';
import { AppNotificationType, type NotificationTracker } from '@/interfaces/INotification';
import TimerTracker from './TimerTracker.vue';
import DoneTodo from './DoneTodo.vue';
import BoxVue from './BoxVue.vue';

const store = useStore(key);
const projects = computed<Map<string, Project>>(() => store.state.projects);

const itemDescription = ref<string | undefined>(undefined);

const doneItems = ref(new Array<TodoItem>());
const selectedProjectId = ref<string>('');

function onEndCounter(counter: number) {
  doneItems.value.push({
    name: itemDescription.value,
    counterTime: counter,
    idProject: selectedProjectId.value,
  } as TodoItem);
  store.commit(NOTIFICAR, {
    title: 'Tarefa completada',
    description: `A tarefa ${itemDescription.value} foi concluída.`,
    type: AppNotificationType.SUCCESS,
  } as NotificationTracker);
  itemDescription.value = undefined;
}
</script>

<style scoped>
.entire-form {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario);
}
</style>
