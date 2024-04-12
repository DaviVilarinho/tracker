<template>
  <section class="section">
    <div class="box">
      <div class="columns ">
        <div class="column is-8" role="form" aria-label="Formulário de Criação de Nova Tarefa">
          <input type="text" class="input" placeholder="Tarefa a iniciar" aria-label="Tarefa">
        </div>
        <div class="column">
          <div class="is-flex is-align-items-center is-justify-content-space-around">
            <section><strong>00:00:00</strong></section>
            <button class="button">
              <span class="icon"><i class="fas fa-play"></i></span>
            </button>
            <button class="button"><span class="icon"><i class="fas fa-stop"></i></span></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormularioTracker',
  setup() {
    // const todoItem = ref<string>('');
  },
});
</script>

<style></style>
