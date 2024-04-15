<template>
  <div class="notificacoes">
    <article v-for="notification in notifications.values()" :key="notification.id" class="message" :class="`is-${notification.type}`"
      :data-theme="isDarkMode ? 'dark' : 'light'">
      <div class="message-header">
        {{ notification.title }}
      </div>
      <div class="message-body">
        {{ notification.description }}
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { key } from '@/store';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);
const isDarkMode = computed(() => store.state.isDarkMode);

const notifications = computed(() => store.state.notifications);
</script>

<style scoped>
.notificacoes {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25%;
  z-index:99999;
  opacity: 80%;
}
</style>
