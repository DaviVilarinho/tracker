/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const clientHttp = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function getProjects() {
  return clientHttp.get('projects');
}
