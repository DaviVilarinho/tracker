<template>
  <box-vue @click.prevent="isEditing = !isEditing">
    <div class="is-flex is-justify-content-space-between is-align-items-center px-4">
      <div>
        {{ item.name ?? 'Tarefa sem Descrição' }}
      </div>
      <div>
        <p>
          <span class="has-text-weight-light">do projeto: </span>
          <span class="has-text-weight-medium"> {{ store.state.projectModule.projects[item.idProject]?.name ?? 'Tarefa sem projeto' }}</span>
        </p>
      </div>
      <div>
        <cronometro-view :counter="item.counterTime" />
      </div>
    </div>
  </box-vue>
  <edit-task-modal :is-editing="isEditing" @toggle-edit="isEditing = !isEditing" :item="props.item"/>
</template>

<script setup lang="ts">
import {
  defineProps, PropType,
  ref,
} from 'vue';
import type Task from '@/interfaces/ITask';
import { useStore } from 'vuex';
import { key } from '@/store';
import CronometroView from './CronometroView.vue';
import BoxVue from './BoxVue.vue';
import EditTaskModal from './EditTaskModal.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const store = useStore(key);

const isEditing = ref<boolean>(false);
</script>
