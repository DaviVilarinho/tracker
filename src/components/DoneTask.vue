<template>
  <box-vue @click.prevent="isEditing = !isEditing">
    <div class="is-flex is-justify-content-space-between is-align-items-center px-4">
      <div>
        {{ item.name ?? 'Tarefa sem Descrição' }}
      </div>
      <div>
        <p>
          <span class="has-text-weight-light">do projeto: </span>
          <span class="has-text-weight-medium"> {{ store.state.projects[item.idProject]?.name ?? 'Tarefa sem projeto'
            }}</span>
        </p>
      </div>
      <div>
        <cronometro-view :counter="item.counterTime" />
      </div>
    </div>
  </box-vue>
  <div class="modal" :class="{ 'is-active': isEditing }">
    <div class="modal-background" @click.prevent="isEditing = !isEditing" @keydown.prevent="isEditing = !isEditing">
    </div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando {{ item.name }}</p>
        <button class="delete" aria-label="close" @click.prevent="isEditing = !isEditing"
          @keydown.prevent="isEditing = !isEditing"></button>
      </header>
      <section class="modal-card-body">
        <form>
          <div>
            <div class="field" role="form" aria-label="Campo para renomear">
              <label class="label" id="nid-1" type="text" htmlFor="newItemDescription"
                aria-label="Novo Nome para Tarefa">
                Nova descrição
                <input type="text" id="newItemDescription" class="input" placeholder="Tarefa a iniciar"
                  aria-label="Campo novo nome para tarefa" v-model="newItemDescription">
              </label>
            </div>
            <div class="field" role="form">
              <label class="label" htmlFor="sel-project">
                Projeto Associado:<br>
                <div class="control select">
                  <select type="select" id="sel-project" v-model="reselectedProjectId"
                    placeholder="Projeto" aria-label="Selecionar ID Projeto Relacionado à Tarefa">
                    <option value="">Projeto</option>
                    <template v-for="project in projects" :key="project.id">
                      <option :value="project.id">{{ project.name }}</option>
                    </template>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click.prevent="edit">Salvar</button>
          <button class="button" @click.prevent="isEditing = !isEditing"
            @keydown.prevent="isEditing = !isEditing">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed, defineProps, PropType, ref,
} from 'vue';
import type Task from '@/interfaces/ITask';
import { useStore } from 'vuex';
import { EDIT_TASK_API, key } from '@/store';
import useNotificar from '@/hooks/notificar';
import { AppNotificationType } from '@/interfaces/INotification';
import CronometroView from './CronometroView.vue';
import BoxVue from './BoxVue.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const store = useStore(key);
const isEditing = ref<boolean>(false);
const newItemDescription = ref<string | undefined>(props.item.name);
const reselectedProjectId = ref<string>(props.item.idProject);

const projects = computed(() => store.state.projects);

async function edit() {
  if (newItemDescription.value === undefined) {
    useNotificar('Tarefa não editada', 'A tarefa não pode ficar sem nome', AppNotificationType.DANGER);
    return;
  }
  if (projects.value[reselectedProjectId.value] === undefined) {
    useNotificar('Tarefa não completada', `A tarefa ${newItemDescription.value} não foi editada porque não está associada à um projeto válido.`, AppNotificationType.DANGER);
    return;
  }
  await store.dispatch(EDIT_TASK_API, {
    id: props.item.id,
    name: newItemDescription.value,
    counterTime: props.item.counterTime,
    idProject: reselectedProjectId.value,
  } as Task);
  useNotificar('Tarefa Editada', `A tarefa ${newItemDescription.value} foi editada com sucesso.`, AppNotificationType.SUCCESS);
  isEditing.value = false;
}
</script>
