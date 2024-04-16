<template>
  <section class="section">
    <h1 class="title is-1 sublight">Tarefas</h1>
    <div class="box">
      <div class="columns">
        <div class="column is-6" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa" v-model="itemDescription">
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
      <div class="field pb-4">
        <label type="text" class="has-text-weight-light">
          <p class="control has-icons-left">
            <span class="icon is-small is-left"><i class="fas fa-search"/></span>
            <input type="text" class="input" v-model="filterTaskSearch" placeholder="Digite para filtrar">
          </p>
        </label>
      </div>
      <template v-if="(filterTaskSearch?.length ?? 0) > 0">
        <done-task v-show="Object.values(filteredTasks).length > 0" v-for="(item, i) in filteredTasks" :key="i" :item="item" />
        <box-vue v-show="Object.values(filteredTasks).length === 0" class="has-text-warning">Nenhuma tarefa foi encontrada com o filtro "{{ filterTaskSearch }}"</box-vue>
      </template>
      <template v-else>
        <done-task v-show="Object.values(doneItems).length > 0" v-for="(item, i) in doneItems" :key="i" :item="item" />
        <box-vue v-show="Object.values(doneItems).length === 0">Nenhuma tarefa foi cadastrada</box-vue>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import type Task from '@/interfaces/ITask';
import { key, NOTIFICAR } from '@/store';
import { useStore } from 'vuex';
import { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';
import useNotificar from '@/hooks/notificar';
import { CREATE_TASK_API, GET_FILTERED_TASKS } from '@/store/modules/task';
import TimerTracker from './TimerTracker.vue';
import DoneTask from './DoneTask.vue';
import BoxVue from './BoxVue.vue';

const store = useStore(key);
const isDarkMode = computed(() => store.state.isDarkMode);
const projects = computed(() => store.state.projectModule.projects);

const itemDescription = ref<string | undefined>(undefined);
const filterTaskSearch = ref<string | undefined>(undefined);
const filteredTasks = computed(() => store.state.taskModule.filteredTasks);

const doneItems = computed(() => store.state.taskModule.tasks);
const selectedProjectId = ref<string>('');

watchEffect(() => {
  if ((filterTaskSearch.value?.length ?? 0) > 0) {
    store.dispatch(GET_FILTERED_TASKS, filterTaskSearch.value);
  }
});

async function onEndCounter(counter: number) {
  if (itemDescription.value === undefined) {
    useNotificar('Tarefa não completada', 'A tarefa sem nome não foi concluída porque não está associada à um projeto.', AppNotificationType.DANGER);
    return;
  }
  if (projects.value[selectedProjectId.value] === undefined) {
    useNotificar('Tarefa não completada', `A tarefa ${itemDescription.value} não foi concluída porque não está associada à um projeto.`, AppNotificationType.DANGER);
    return;
  }
  try {
    await store.dispatch(CREATE_TASK_API, {
      name: itemDescription.value,
      counterTime: counter,
      idProject: selectedProjectId.value,
      id: (new Date()).getTime().toString(),
    } as Task);
  } catch (err) {
    store.commit(NOTIFICAR, {
      title: 'Não foi possível criar a tarefa',
      description: 'Tente novamente mais tarde',
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
  }
  useNotificar('Tarefa completada', `A tarefa ${itemDescription.value} foi concluída.`, AppNotificationType.SUCCESS);
  itemDescription.value = undefined;
}
</script>
<style scoped>
.sublight {
  opacity: 80%;
}
</style>
