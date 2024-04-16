<template>
  <project-form />
  <table class="table is-fullwidth table-themed mt-4">
    <thead>
      <tr>
        <th><abbr title="ID">ID</abbr></th>
        <th><abbr title="Nome">Nome do Projeto</abbr></th>
        <th><abbr title="Actions">Ações</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="aProject in projects" :key="aProject.id">
        <td>{{ aProject.id ?? 'Sem ID' }}</td>
        <td>{{ aProject.name }}</td>
        <td>
          <router-link :to="`/projetos/${aProject.id}`" class="button">
            <span class="icon is-small">
              <i class="fa fa-pencil-alt"></i>
            </span>
          </router-link>
          <div class="button" @click.prevent="deleteProject(aProject.id)" @keyDown.prevent="deleteProject(aProject.id)">
            <span class="icon is-small">
              <i class="fa fa-eraser"></i>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { key, NOTIFICAR } from '@/store';
import { useStore } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';
import { computed } from 'vue';
import { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';
import { DELETE_PROJECT_API } from '@/store/modules/project';

const store = useStore(key);

const projects = computed(() => store.state.projectModule.projects);

const deleteProject = async (id?: string) => {
  if (!id) {
    store.commit(NOTIFICAR, {
      title: "Can't delete an undefined project",
      description: 'The project does not exist',
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
    return;
  }
  try {
    await store.dispatch(DELETE_PROJECT_API, id);
  } catch (err) {
    store.commit(NOTIFICAR, {
      title: 'Não foi possível deletar',
      description: `Confira se ${id} existe e tente novamente`,
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
  }
};
</script>

<style>
.table-themed {
}

.table-themed > tbody > tr > td {
  font-weight: 400;
}
</style>
