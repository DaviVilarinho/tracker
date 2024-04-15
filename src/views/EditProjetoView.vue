<template>
  <section class="section projects">
    <h1 class="title title-match-theme">Projeto {{ `${project?.name ?? ''}`}}</h1>
    <project-form :pre-saved="project"/>
  </section>
</template>

<script setup lang="ts">
import ProjectForm from '@/components/ProjectForm.vue';
import { key } from '@/store';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import type { Project } from '@/interfaces/IProject.vue';

const router = useRouter();
const store = useStore(key);

const project = ref<Project | undefined>();

onBeforeRouteUpdate((from, to) => {
  try {
    if (store.state.projects.get(to.params.id as string)?.id !== to.params.id) {
      throw new Error('Invalid param');
    }
    project.value = store.state.projects.get(to.params.id as string);
  } catch (e) {
    router.push({ name: 'projects' });
  }
});
</script>
