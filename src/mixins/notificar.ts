import { store, NOTIFICAR } from '@/store';
import type { AppNotificationType, TrackerNotification } from '@/interfaces/INotification';

export default function notificar(title: string, description: string, type: AppNotificationType): void {
  store.commit(NOTIFICAR, {
    title,
    description,
    type,
  } as TrackerNotification);
}
