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
      <tr v-for="([id, aProject], index) in projects" :key="id">
        <td>{{ id }}</td>
        <td>{{ aProject.name }}</td>
        <td>
          <router-link :to="`/projetos/${id}`" class="button">
            <span class="icon is-small">
              <i class="fa fa-pencil-alt"></i>
            </span>
          </router-link>
          <div class="button">
            <span class="icon is-small" @click.prevent="deleteProject(id)" @keyDown.prevent="deleteProject(id)">
              <i class="fa fa-eraser"></i>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { key } from '@/store';
import { useStore } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';
import { computed } from 'vue';

const store = useStore(key);

const projects = computed(() => store.state.projects);

const deleteProject = (id: string) => {
  store.commit('deleteProject', id);
};
</script>

<style>
.table-themed {
  background-color: var(--bg-secundario) !important;
  color: var(--texto-secundario) !important;
}
.table-themed > thead > tr > th {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario) !important;
}

.table-themed > tbody > tr > td {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario) !important;
  font-weight: 400;
}
</style>
