<template>
  <section class="section projects">
    <h1 class="title title-match-theme">Projetos</h1>
    <project-form/>
    <table class="table is-fullwidth table-themed mt-4">
      <thead>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th><abbr title="Nome">Nome do Projeto</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="([id, aProject], index) in projects" :key="id">
          <td>{{ id }}</td>
          <td>{{ aProject.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { key } from '@/store';
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';

const store = useStore(key);

const projects = computed(() => store.state.projects);
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
