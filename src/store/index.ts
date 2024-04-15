import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import type { Notification } from '@/interfaces/INotification';

interface Estado {
  projects: Map<string, Project>;
  notifications: Map<string, Notification>;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');

export const store = createStore<Estado>({
  state: {
    projects: new Map<string, Project>(),
    notifications: new Map<string, Notification>(),
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
