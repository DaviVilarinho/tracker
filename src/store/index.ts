import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { type TrackerNotification } from '@/interfaces/INotification';
import { Estado } from '@/interfaces/IEstado';
import { taskModule } from './modules/task';
import { projectModule } from './modules/project';

export const key: InjectionKey<Store<Estado>> = Symbol('state-injection-key');
export const NOTIFICAR = 'NOTIFICAR';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export const store = createStore<Estado>({
  state: {
    projectModule: {
      projects: {},
    },
    notifications: new Map<number, TrackerNotification>(),
    isDarkMode: false,
    taskModule: {
      tasks: {},
    },
  },
  mutations: {
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
  modules: {
    taskModule, projectModule,
  },
});
