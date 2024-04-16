import Project from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { AppNotificationType, type TrackerNotification } from '@/interfaces/INotification';
import {
  deleteProjectById, getProjects, getTasks, postProject, postTask, putProject,
} from '@/http';
import TodoItem from '@/interfaces/ITodoItem';

interface Estado {
  projects: Record<string, Project>;
  notifications: Map<number, TrackerNotification>;
  isDarkMode: boolean;
  tasks: Record<string, TodoItem>;
}

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');
export const NOTIFICAR = 'NOTIFICAR';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_TASKS = 'GET_TASKS';
export const CHANGE_PROJECT = 'POST_PROJECT';
export const DELETE_PROJECT_API = 'DELETE_PROJECT_API';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_API = 'CREATE_TASK_API';

export const store = createStore<Estado>({
  state: {
    projects: {},
    notifications: new Map<number, TrackerNotification>(),
    isDarkMode: false,
    tasks: {},
  },
  getters: {
    projects: (state) => state.projects,
  },
  mutations: {
    setTodoItem(state, todoItem: TodoItem) {
      state.tasks[todoItem.name] = todoItem;
    },
    setTodoItems(state, todoItems: Record<string, TodoItem>) {
      state.tasks = todoItems;
    },
    setProject(state, project) {
      state.projects[project.id] = project;
    },
    setProjects(state, projects) {
      state.projects = projects;
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
        commit('setProjects', Object.fromEntries(projects.map((project) => [project.id, project])));
      } catch (err) {
        state.projects = {};
        commit(NOTIFICAR, {
          title: 'Não foi possível listar projetos',
          description: 'O serviço se encontra temporariamente indisponível',
          type: AppNotificationType.DANGER,
        } as TrackerNotification);
      }
    },
    [GET_TASKS]: async ({ commit }) => {
      try {
        const response = await getTasks();
        const tasks = response.data as Array<TodoItem>;
        commit('setTodoItems', Object.fromEntries(tasks.map((task) => [task.name, task])) as Record<string, TodoItem>);
      } catch (err) {
        commit('setTodoItems', {});
        commit(NOTIFICAR, {
          title: 'Não foi possível listar tarefas',
          description: 'O serviço se encontra temporariamente indisponível',
          type: AppNotificationType.DANGER,
        } as TrackerNotification);
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
    [CREATE_TASK_API]: async ({ commit }, todoItem: TodoItem) => {
      try {
        const response = await postTask(todoItem);
        if (response.status >= 400) {
          throw response;
        }
        commit('setTodoItem', response.data as TodoItem);
      } catch (error) {
        commit(NOTIFICAR, {
          title: 'Não foi possível criar a tarefa',
          description: 'Tente novamente mais tarde',
          type: AppNotificationType.DANGER,
        } as TrackerNotification);
      }
    },
  },
});
