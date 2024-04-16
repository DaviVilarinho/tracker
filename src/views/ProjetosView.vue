<template>
  <section class="section projects">
    <h1 class="title is-1"><span class="sublight">Projetos</span></h1>
    <router-view/>
  </section>
</template>

<script setup lang="ts">
import { NOTIFICAR, key } from '@/store';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';
import { GET_PROJECTS } from '@/store/modules/project';

const store = useStore(key);

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
});
</script>

<style scoped>
.sublight {
  opacity: 80%;
}
</style>
