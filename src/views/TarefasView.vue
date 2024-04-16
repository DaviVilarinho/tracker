<template>
  <formulario-tracker/>
</template>

<script setup lang="ts">
import FormularioTracker from '@/components/FormularioTracker.vue';
import { GET_TASKS, key } from '@/store';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);

onMounted(() => {
  store.dispatch(GET_TASKS);
});
</script>
