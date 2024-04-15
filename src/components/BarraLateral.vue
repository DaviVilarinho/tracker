<template>
  <section class="section columns">
    <div class="container column is-three-fifths text-center" style="height: auto !important; white-space: unset !important; width: 100%">
      <h1 class="title">
        Tracker
      </h1>
      <hr>
      <p class="subtitle">
        Seu organizador de tarefas.
      </p>
      <nav class="panel mt-5 p-4 navpad">
        <ul>
          <router-link to="/" class="link">
            <i class="fa fa-tasks"></i>
            Tarefas
          </router-link>
        </ul>
        <ul>
          <router-link to="/projetos" class="link">
            <i class="fa fa-briefcase"></i>
            Projetos
          </router-link>
        </ul>
      </nav>
      <button class="button" @click.prevent="emit('toggleTheme')">Modo {{ isDarkMode ? 'Claro' : 'Escuro'  }}</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { key } from '@/store';
import { defineEmits, computed } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['toggleTheme']);

const store = useStore(key);
const isDarkMode = computed(() => store.state.isDarkMode);
</script>

<style>
.text-center {
  text-align: center;
}

.navpad > ul {
  padding-top: .5rem;
  padding-bottom: .5rem;
}
</style>
