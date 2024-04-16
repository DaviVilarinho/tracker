import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { AppNotificationType, type TrackerNotification } from '@/interfaces/INotification';
import {
  deleteProjectById, getProjects, postProject, putProject,
} from '@/http';

interface Estado {
  projects: Record<string, Project>;
  notifications: Map<number, TrackerNotification>;
  isDarkMode: boolean;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');
export const NOTIFICAR = 'NOTIFICAR';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const GET_PROJECTS = 'GET_PROJECTS';
export const CHANGE_PROJECT = 'POST_PROJECT';
export const DELETE_PROJECT_API = 'DELETE_PROJECT_API';

export const store = createStore<Estado>({
  state: {
    projects: {},
    notifications: new Map<number, TrackerNotification>(),
    isDarkMode: false,
  },
  getters: {
    projects: (state) => state.projects,
  },
  mutations: {
    setProject(state, project) {
      state.projects[project.id] = project;
    },
    deleteProject(state, projectId: string) {
      delete state.projects[projectId];
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
        state.projects = {};
      }
    },
    [CHANGE_PROJECT]: async ({ commit, state }, project) => {
      try {
        let response;
        if (project?.id && state.projects[project.id] !== undefined) {
          response = await putProject(project);
        } else {
          response = await postProject(project);
        }
        if (response.status >= 400) {
          throw response;
        }
        commit('setProject', response.data as Project);
      } catch (err) {
        commit(NOTIFICAR, {
          title: 'Could not create project',
          description: 'Try again later',
          type: AppNotificationType.DANGER,
        } as TrackerNotification);
      }
    },
    [DELETE_PROJECT_API]: async ({ commit }, id: string) => {
      try {
        const response = await deleteProjectById(id);
        if (response.status >= 400) {
          throw response;
        }
        commit('deleteProject', (response.data as Project)?.id);
      } catch (err) {
        commit(NOTIFICAR, {
          title: 'Não foi possível deletar',
          description: `Confira se ${id} existe e tente novamente`,
          type: AppNotificationType.DANGER,
        } as TrackerNotification);
      }
    },
  },
});
