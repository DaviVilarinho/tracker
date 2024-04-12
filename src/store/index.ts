import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

interface Estado {
  projects: Project[]
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');

export const store = createStore<Estado>({
  state: {
    projects: [],
  },
  mutations: {
    addProject(state, project) {
      state.projects.push(project);
    },
  },
});
