/* eslint-disable import/prefer-default-export */
import Project from '@/interfaces/IProject';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const clientHttp = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function getProjects() {
  return clientHttp.get('/projects');
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
