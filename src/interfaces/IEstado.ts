import { TrackerNotification } from './INotification';
import Project from './IProject';
import Task from './ITask';

export interface EstadoProject {
  projects: Record<string, Project>;
}

export interface EstadoTask {
  tasks: Record<string, Task>;
  filteredTasks: Record<string, Task>;
}

export interface Estado {
  projectModule: EstadoProject;
  notifications: Map<number, TrackerNotification>;
  isDarkMode: boolean;
  taskModule: EstadoTask;
}
