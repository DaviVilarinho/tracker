import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import type { TrackerNotification } from '@/interfaces/INotification';

interface Estado {
  projects: Map<string, Project>;
  notifications: Map<number, TrackerNotification>;
  isDarkMode: boolean;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');
export const NOTIFICAR = 'NOTIFICAR';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export const store = createStore<Estado>({
  state: {
    projects: new Map<string, Project>(),
    notifications: new Map<number, TrackerNotification>(),
    isDarkMode: false,
  },
  mutations: {
    setProject(state, project) {
      state.projects.set(project.id, project);
    },
    deleteProject(state, projectId: string) {
      state.projects.delete(projectId);
    },
    [NOTIFICAR](state, notification: TrackerNotification) {
      const modNotification = notification;
      modNotification.id = notification.id ?? new Date().getTime();
      state.notifications.set(modNotification.id, modNotification);
      setTimeout(() => {
        if (modNotification.id) {
          state.notifications.delete(modNotification.id);
        }
      }, 4000);
    },
    [TOGGLE_THEME](state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
