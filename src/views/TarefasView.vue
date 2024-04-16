<template>
  <formulario-tracker/>
</template>

<script setup lang="ts">
import FormularioTracker from '@/components/FormularioTracker.vue';
import { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';
import { key, NOTIFICAR } from '@/store';
import { GET_TASKS } from '@/store/modules/task';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);

onMounted(() => {
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
