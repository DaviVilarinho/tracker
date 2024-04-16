<template>
  <section class="section">
    <h1 class="title is-1 sublight">Tarefas</h1>
    <div class="box">
      <div class="columns">
        <div class="column is-6" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa"
            v-model="itemDescription">
        </div>
        <div class="column is-3">
          <div class="select" :data-theme="isDarkMode ? 'dark' : 'light'">
            <select v-model="selectedProjectId" aria-label="Selecionar ID Projeto Relacionado à Tarefa">
              <option value="">Projeto</option>
              <template v-for="project in projects" :key="project.id">
                <option :value="project.id">{{ project.name }}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="column">
          <timer-tracker @end-counter="onEndCounter"></timer-tracker>
        </div>
      </div>
      <template v-if="Object.keys(doneItems).length > 0">
        <done-task v-for="(item, i) in doneItems" :key="i" :item="item" />
      </template>
      <box-vue v-else>Nenhuma tarefa foi realizada</box-vue>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type Task from '@/interfaces/ITask';
import { CREATE_TASK_API, key } from '@/store';
import { useStore } from 'vuex';
import { AppNotificationType } from '@/interfaces/INotification';
import useNotificar from '@/hooks/notificar';
import TimerTracker from './TimerTracker.vue';
import DoneTask from './DoneTask.vue';
import BoxVue from './BoxVue.vue';

const store = useStore(key);
const isDarkMode = computed(() => store.state.isDarkMode);
const projects = computed(() => store.state.projects);

const itemDescription = ref<string | undefined>(undefined);

const doneItems = computed(() => store.state.tasks);
const selectedProjectId = ref<string>('');

async function onEndCounter(counter: number) {
  if (itemDescription.value === undefined) {
    useNotificar('Tarefa não completada', 'A tarefa sem nome não foi concluída porque não está associada à um projeto.', AppNotificationType.DANGER);
    return;
  }
  if (projects.value[selectedProjectId.value] === undefined) {
    useNotificar('Tarefa não completada', `A tarefa ${itemDescription.value} não foi concluída porque não está associada à um projeto.`, AppNotificationType.DANGER);
    return;
  }
  await store.dispatch(CREATE_TASK_API, {
    name: itemDescription.value,
    counterTime: counter,
    idProject: selectedProjectId.value,
  } as Task);
  useNotificar('Tarefa completada', `A tarefa ${itemDescription.value} foi concluída.`, AppNotificationType.SUCCESS);
  itemDescription.value = undefined;
}
</script>
<style scoped>
.sublight {
  opacity: 80%;
}
</style>
