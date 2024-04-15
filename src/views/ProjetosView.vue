<template>
  <section class="section projects">
    <h1 class="title is-1"><span class="sublight">Projetos</span></h1>
    <router-view/>
  </section>
</template>

<script setup>
import { GET_PROJECTS, key } from '@/store';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore(key);

onMounted(() => {
  store.dispatch(GET_PROJECTS);
});
</script>

<style scoped>
.sublight {
  opacity: 80%;
}
</style>
