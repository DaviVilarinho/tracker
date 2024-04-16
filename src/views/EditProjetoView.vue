<template>
  <h2 class="title">Projeto {{ `${project?.name ?? ''}`}}</h2>
  <project-form :pre-saved="project"/>
</template>

<script setup lang="ts">
import ProjectForm from '@/components/ProjectForm.vue';
import { key } from '@/store';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, defineProps } from 'vue';
import useNotificar from '@/hooks/notificar';
import { AppNotificationType } from '@/interfaces/INotification';
import type Project from '@/interfaces/IProject';

const router = useRouter();
const store = useStore(key);
const props = defineProps({ id: String });

const project = ref<Project | undefined>();

try {
  if (store.state.projectModule.projects[props.id as string]?.id !== props.id) {
    throw new Error('Invalid param');
  }
  project.value = store.state.projectModule.projects[props.id as string];
} catch (e) {
  useNotificar('Não foi possível editar', 'Esta página não existe', AppNotificationType.DANGER);
  router.push({ name: 'TableView' });
}
</script>
