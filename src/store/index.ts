import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

interface Estado {
  projects: Map<string, Project>;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');

export const store = createStore<Estado>({
  state: {
    projects: new Map<string, Project>(),
  },
  mutations: {
    setProject(state, project) {
      state.projects.set(project.id, project);
    },
    deleteProject(state, projectId: string) {
      state.projects.delete(projectId);
    },
  },
});
