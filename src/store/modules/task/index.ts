import { Module } from 'vuex';
import {
  getTasks, postTask,
  putTask,
} from '@/http';
import Task from '@/interfaces/ITask';
import { Estado, EstadoTask } from '@/interfaces/IEstado';

export const GET_TASKS = 'GET_TASKS';
export const GET_FILTERED_TASKS = 'GET_FILTERED_TASKS';
export const SET_FILTERED_TASKS = 'SET_FILTERED_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_API = 'CREATE_TASK_API';
export const EDIT_TASK_API = 'EDIT_TASK_API';

export const taskModule: Module<EstadoTask, Estado> = {
  state: {
    tasks: {},
    filteredTasks: {},
  },
  mutations: {
    setTask(state, todoItem: Task) {
      state.tasks[todoItem.id] = todoItem;
    },
    setTasks(state, todoItems: Record<string, Task>) {
      state.tasks = todoItems;
    },
    [SET_FILTERED_TASKS]: (state, filteredTasks: Record<string, Task>) => {
      state.filteredTasks = filteredTasks;
    },
  },
  actions: {
    [GET_TASKS]: async ({ commit }) => {
      try {
        const response = await getTasks();
        const tasks = response.data as Array<Task>;
        commit('setTasks', Object.fromEntries(tasks.map((task) => [task.id, task])) as Record<string, Task>);
      } catch (err) {
        commit('setTasks', {});
        throw err;
      }
    },
    [GET_FILTERED_TASKS]: async ({ commit }, filterKey: string) => {
      try {
        const response = await getTasks(filterKey);
        const tasks = response.data as Array<Task>;
        commit(SET_FILTERED_TASKS, Object.fromEntries(tasks.map((task) => [task.id, task])) as Record<string, Task>);
      } catch (err) {
        commit(SET_FILTERED_TASKS, {});
        throw err;
      }
    },
    [CREATE_TASK_API]: async ({ commit }, todoItem: Task) => {
      const response = await postTask(todoItem);
      if (response.status >= 400) {
        throw response;
      }
      commit('setTask', response.data as Task);
    },
    [EDIT_TASK_API]: async ({ commit }, task: Task) => {
      const response = await putTask(task);
      if (response.status >= 400) {
        throw new Error(response.data);
      }
      commit('setTask', response.data as Task);
    },
  },
};
