<template>
  <h2 class="title title-match-theme">Projeto {{ `${project?.name ?? ''}`}}</h2>
  <project-form :pre-saved="project"/>
</template>

<script setup lang="ts">
import ProjectForm from '@/components/ProjectForm.vue';
import { key } from '@/store';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted, ref, defineProps } from 'vue';
import type { Project } from '@/interfaces/IProject.vue';

const router = useRouter();
const store = useStore(key);
const props = defineProps({ id: String });

const project = ref<Project | undefined>();

onMounted(() => {
  try {
    if (store.state.projects.get(props.id as string)?.id !== props.id) {
      throw new Error('Invalid param');
    }
    project.value = store.state.projects.get(props.id as string);
  } catch (e) {
    router.push({ name: 'projects' });
  }
});
</script>
