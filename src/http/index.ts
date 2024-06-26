/* eslint-disable import/prefer-default-export */
import Project from '@/interfaces/IProject';
import Task from '@/interfaces/ITask';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const clientHttp = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function getProjects() {
  return clientHttp.get('/projects');
}

export async function getTasks(filter?: string) {
  return clientHttp.get(`/tasks${filter !== undefined ? (`?name=${filter}`) : ''}`);
}

export async function postProject(project: Project) {
  return clientHttp.post('/projects', {
    name: project.name,
  });
}

export async function putProject(project: Project) {
  return clientHttp.patch(`/projects/${project.id}`, project, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      id: project.id,
    },
  });
}

export async function deleteProjectById(id: string) {
  return clientHttp.delete(`/projects/${id}`);
}

export async function postTask(task: Task) {
  return clientHttp.post('/tasks', task);
}

export async function putTask(task: Task) {
  return clientHttp.patch(`/tasks/${task.id}`, task, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      id: task.id,
    },
  });
}
