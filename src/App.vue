<template>
  <main :class="themeClasses">
    <div class="column is-one-quarter content-bar">
      <barra-lateral :isDarkMode="isDarkMode" @toggle-theme="toggleTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <router-view/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
  computed: {
    themeClasses() {
      const classes = ['columns', 'is-gapless', 'is-multiline'];
      if (this.isDarkMode) {
        classes.push('modo-escuro');
      }
      return classes;
    },
  },
});
</script>

<style>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
  --bg-secundario: #f8f8f8;
  --texto-secundario: #444;
  --bg-terciario: #fafafa;
  --texto-terciario: #333;
  --texto-fraco: #999999;
  --texto-emphasis: #000;

  position: fixed;
  width: 100%;
  height: 100%;
}

main.modo-escuro {
  --bg-primario: #2b2b2b;
  --texto-primario: #dfdfdf;
  --bg-secundario: #303030;
  --texto-secundario: #ffffff;
  --bg-terciario: #3a3a3a;
  --texto-terciario: #dadada;
  --texto-fraco: #aaa;
  --texto-emphasis: #fff;
}

body {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}

.content {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}

.content-bar {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario);
}

.input-colored {
  background-color: var(--bg-secundario);
  color: var(--texto-secundario) !important;
}

.input-colored::placeholder {
  color: var(--texto-fraco) !important;
}

.title-match-theme {
  color: var(--texto-secundario) !important;
}

.subtitle-match-theme {
  color: var(--texto-fraco) !important;
}

.button-themed {
  background-color: var(--bg-terciario);
  border-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
