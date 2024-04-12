<template>
  <section class="section columns">
    <div class="container column is-three-fifths text-center" style="height: auto !important; white-space: unset !important; width: 100%">
      <h1 class="title title-match-theme">
        Tracker
      </h1>
      <hr>
      <p class="subtitle subtitle-match-theme">
        Seu organizador de tarefas.
      </p>
      <button class="button button-themed" @click.prevent="emit('toggleTheme')">Modo {{ isDarkMode ? 'Claro' : 'Escuro'  }}</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['toggleTheme']);

defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});
</script>

<style>
.title-match-theme {
  color: var(--texto-secundario);
}

.subtitle-match-theme {
  color: var(--texto-fraco);
}

.text-center {
  text-align: center;
}

.button-themed {
  background-color: var(--bg-terciario);
  border-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
