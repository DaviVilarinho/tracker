<template>
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

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import type Project from '@/interfaces/IProject';

const store = useStore(key);

const projectName = ref<string | undefined>();

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
