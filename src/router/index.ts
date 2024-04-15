import EditProjetoView from '@/views/EditProjetoView.vue';
import NovoProjetoView from '@/views/NovoProjetoView.vue';
import ProjetosView from '@/views/ProjetosView.vue';
import TableView from '@/views/TableView.vue';
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
  children: [{
    path: ':id',
    name: 'EditProjeto',
    component: EditProjetoView,
    props: true,
  }, {
    path: '',
    name: 'TableView',
    component: TableView,
  }, {
    path: 'novo-projeto',
    name: 'NovoProjeto',
    component: NovoProjetoView,
  }],
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
