import EditProjetoView from '@/views/EditProjetoView.vue';
import NovoProjetoView from '@/views/NovoProjetoView.vue';
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
}, {
  path: '/novo-projeto',
  name: 'NovoProjeto',
  component: NovoProjetoView,
}, {
  path: '/projetos/:id',
  name: 'EditProjeto',
  component: EditProjetoView,
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
