import { NotificationPort } from '@/domain/ports/NotificationPort'
import { toast } from 'sonner'

export class SonnerNotificationAdapter extends NotificationPort {
  success (message, description) {
    toast.success(message, { description })
  }

  error (message, description) {
    toast.error(message, { description })
  }
}
