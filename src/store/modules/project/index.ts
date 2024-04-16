import Project from '@/interfaces/IProject';
import {
  deleteProjectById, getProjects, postProject, putProject,
} from '@/http';
import { Estado, EstadoProject } from '@/interfaces/IEstado';
import { Module } from 'vuex';

export const GET_PROJECTS = 'GET_PROJECTS';
export const CHANGE_PROJECT = 'POST_PROJECT';
export const DELETE_PROJECT_API = 'DELETE_PROJECT_API';

export const projectModule: Module<EstadoProject, Estado> = {
  state: {
    projects: {},
  },
  getters: {
    projects: (state) => state.projects,
  },
  mutations: {
    setProject(state, project) {
      state.projects[project.id] = project;
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    deleteProject(state, projectId: string) {
      delete state.projects[projectId];
    },
  },
  actions: {
    [GET_PROJECTS]: async ({ commit }) => {
      try {
        const response = await getProjects();
        const projects = response.data as Array<Project>;
        commit('setProjects', Object.fromEntries(projects.map((project) => [project.id, project])));
      } catch (err) {
        commit('setProjects', {});
      }
    },
    [CHANGE_PROJECT]: async ({ commit, state }, project) => {
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
    },
    [DELETE_PROJECT_API]: async ({ commit }, id: string) => {
      const response = await deleteProjectById(id);
      if (response.status >= 400) {
        throw response;
      }
      commit('deleteProject', (response.data as Project)?.id);
    },
  },
};
