import ProjetosView from '@/views/ProjetosView.vue';
import TarefasView from '@/views/TarefasView.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Home',
  component: TarefasView,
}, {
  path: '/projetos',
  name: 'Projetos',
  component: ProjetosView,
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
