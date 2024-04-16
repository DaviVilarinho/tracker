<template>
  <main :class="themeClasses" :data-theme="isDarkMode ? 'dark' : 'light'">
    <div class="column is-one-quarter section content">
      <barra-lateral :isDarkMode="isDarkMode" @toggle-theme="store.commit(TOGGLE_THEME)" />
    </div>
    <div class="column is-three-quarter section content">
      <notifications-vue />
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  key,
  NOTIFICAR,
  TOGGLE_THEME,
} from '@/store';
import BarraLateral from './components/BarraLateral.vue';
import NotificationsVue from './components/NotificationsVue.vue';
import { AppNotificationType, TrackerNotification } from './interfaces/INotification';
import { GET_PROJECTS } from './store/modules/project';
import { GET_TASKS } from './store/modules/task';

const store = useStore(key);
const isDarkMode = computed(() => store.state.isDarkMode);

const themeClasses = computed(() => {
  const classes = ['columns', 'is-gapless', 'is-multiline'];
  if (store.state.isDarkMode) {
    classes.push('modo-escuro');
  }
  return classes;
});

onMounted(() => {
  try {
    store.dispatch(GET_PROJECTS);
  } catch (err) {
    store.commit(NOTIFICAR, {
      title: 'Não foi possível listar projetos',
      description: 'O serviço se encontra temporariamente indisponível',
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
  }
  try {
    store.dispatch(GET_TASKS);
  } catch (err) {
    store.commit(NOTIFICAR, {
      title: 'Não foi possível listar tarefas',
      description: 'O serviço se encontra temporariamente indisponível',
      type: AppNotificationType.DANGER,
    } as TrackerNotification);
  }
});
</script>

<style>
main {
  position: absolute;
  width: 100%;
  height: 100%;
}

.content {
  background-color: var(--bulma-background);
  color: var(--bulma-text-base);
}
</style>
