// eslint-disable-next-line no-shadow
export enum AppNotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface TrackerNotification {
  title: string;
  description: string;
  type: AppNotificationType;
  id?: number;
}
