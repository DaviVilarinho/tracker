<template>
  <button class="button" @click.prevent="onClickAction" :disabled="isDisabled">
    <span class="icon">
      <i :class="['fas', `fa-${action}`]" />
    </span>
  </button>
</template>

<script lang='ts' setup>
import { defineProps, PropType } from 'vue';

defineProps({
  isDisabled: {
    type: Boolean,
    required: true,
  },
  onClickAction: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});
</script>
