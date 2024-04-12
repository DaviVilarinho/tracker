<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter content-bar">
      <barra-lateral/>
    </div>
    <div class="column is-three-quarter content">
      <formulario-tracker/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTracker from './components/FormularioTracker.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral, FormularioTracker,
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
</style>
