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
import { PropType, ref, defineProps } from 'vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import type Project from '@/interfaces/IProject';
import { useRouter } from 'vue-router';

const store = useStore(key);
const router = useRouter();

const props = defineProps({
  preSaved: {
    type: Object as PropType<Project>,
    required: false,
  },
});

const projectName = ref<string | undefined>(props.preSaved?.name);

function salvar() {
  if (projectName.value === undefined) {
    return;
  }
  const project: Project = {
    name: projectName.value,
    id: props.preSaved?.id ?? new Date().toISOString(),
  };
  store.commit('setProject', project);
  projectName.value = undefined;
  router.push('/projetos');
}
</script>
