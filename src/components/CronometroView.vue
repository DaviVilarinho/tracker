<template>
  <section><strong>{{ timeFormat }}</strong></section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  counter: {
    type: Number,
    default: 0,
  },
});

function pad(n: number, z?: number): string {
  return (`00${n}`).slice(-(z || 2));
}

const timeFormat = computed(() => {
  let s = props.counter;
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
});

</script>
