<template>
  <section class="section projects">
    <h1 class="title title-match-theme">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="projectName" class="label" aria-label="Nome do Projeto">
          <p style="color: var(--texto-emphasis)">Nome do Projeto</p>
          <input type="text" class="input input-colored" v-model="projectName" id="projectName" aria-label="Nome do Projeto" />
        </label>
      </div>
      <div class="field">
        <button type="submit" class="button button-themed">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth table-themed mt-4">
      <thead>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th><abbr title="Nome">Nome do Projeto</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aProject, index) in projects" :key="index">
          <td>{{ aProject.id }}</td>
          <td>{{ aProject.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import Project from '@/interfaces/IProject';
import { key } from '@/store';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);

const projectName = ref<string | undefined>();
const projects = computed(() => store.state.projects);

function salvar() {
  if (projectName.value === undefined) {
    return;
  }
  const project: Project = {
    name: projectName.value,
    id: new Date().toISOString(),
  };
  store.commit('addProject', project);
  projectName.value = undefined;
}
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
