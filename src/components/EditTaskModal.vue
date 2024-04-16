<template>
  <div class="modal" :class="{ 'is-active': props.isEditing }">
    <div class="modal-background" @click.prevent="emit('toggle-edit')" @keydown.prevent="emit('toggle-edit')">
    </div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando {{ item.name }}</p>
        <button class="delete" aria-label="close" @click.prevent="emit('toggle-edit')"
          @keydown.prevent="emit('toggle-edit')"></button>
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
                  <select type="select" id="sel-project" v-model="reselectedProjectId" placeholder="Projeto"
                    aria-label="Selecionar ID Projeto Relacionado à Tarefa">
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
          <button class="button" @click.prevent="emit('toggle-edit')"
            @keydown.prevent="emit('toggle-edit')">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed, PropType, ref, defineProps, defineEmits,
} from 'vue';
import useNotificar from '@/hooks/notificar';
import { useStore } from 'vuex';
import { key, NOTIFICAR } from '@/store';
import Task from '@/interfaces/ITask';
import { EDIT_TASK_API } from '@/store/modules/task';
import { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';

const store = useStore(key);

const props = defineProps({
  item: {
    type: Object as PropType<Task>,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle-edit']);

const newItemDescription = ref<string | undefined>(props.item.name);
const reselectedProjectId = ref<string>(props.item.idProject);

const projects = computed(() => store.state.projectModule.projects);

async function edit() {
  if (newItemDescription.value === undefined) {
    useNotificar('Tarefa não editada', 'A tarefa não pode ficar sem nome', AppNotificationType.DANGER);
    return;
  }
  if (projects.value[reselectedProjectId.value] === undefined) {
    useNotificar('Tarefa não completada', `A tarefa ${newItemDescription.value} não foi editada porque não está associada à um projeto válido.`, AppNotificationType.DANGER);
    return;
  }
  try {
    await store.dispatch(EDIT_TASK_API, {
      id: props.item.id,
      name: newItemDescription.value,
      counterTime: props.item.counterTime,
      idProject: reselectedProjectId.value,
    } as Task);
  } catch (err) {
    store.commit(NOTIFICAR, {
      title: 'Não foi possível editar a tarefa',
      description: 'Tente novamente mais tarde',
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
  }
  useNotificar('Tarefa Editada', `A tarefa ${newItemDescription.value} foi editada com sucesso.`, AppNotificationType.SUCCESS);
  emit('toggle-edit');
}
</script>
