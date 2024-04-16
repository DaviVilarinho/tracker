<template>
  <box-vue>
    <div class="is-flex is-justify-content-space-between is-align-items-center px-4">
      <div>
        {{ item.name ?? 'Tarefa sem Descrição' }}
      </div>
      <div>
        <p>
          <span class="has-text-weight-light">do projeto: </span>
          <span class="has-text-weight-medium"> {{ store.state.projects[item.idProject]?.name ?? 'Tarefa sem projeto' }}</span>
        </p>
      </div>
      <div>
        <cronometro-view :counter="item.counterTime"/>
      </div>
    </div>
  </box-vue>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import type TodoItem from '@/interfaces/ITodoItem';
import { useStore } from 'vuex';
import { key } from '@/store';
import CronometroView from './CronometroView.vue';
import BoxVue from './BoxVue.vue';

const store = useStore(key);

defineProps({
  item: {
    type: Object as PropType<TodoItem>,
    required: true,
  },
});
</script>
