import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { AppNotificationType, type TrackerNotification } from '@/interfaces/INotification';
import { getProjects } from '@/http';

interface Estado {
  projects: Map<string, Project>;
  notifications: Map<number, TrackerNotification>;
  isDarkMode: boolean;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');
export const NOTIFICAR = 'NOTIFICAR';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const GET_PROJECTS = 'GET_PROJECTS';

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
  actions: {
    [GET_PROJECTS]: async ({ state, commit }) => {
      try {
        const response = await getProjects();
        const projects = response.data as Array<Project>;
        projects.forEach((project) => {
          commit('setProject', project);
        });
      } catch (err) {
        state.projects.clear();
      }
    },
  },
});
