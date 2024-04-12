<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ item.name }}
      </div>
      <div class="column">
        <cronometro-view :counter="item.counterTime"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import type TodoItem from '@/interfaces/TodoItem';
import CronometroView from './CronometroView.vue';

defineProps({
  item: {
    type: Object as PropType<TodoItem>,
    required: true,
  },
});
</script>
