<template>
  <section class="section projects">
    <h1 class="title title-match-theme">Novo Projeto</h1>
    <project-form />
  </section>
</template>

<script setup lang="ts">
import ProjectForm from '@/components/ProjectForm.vue';
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
