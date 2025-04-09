export class NotificationPort {
  success (message, description) {
    throw new Error('success must be implemented')
  }

  error (message, description) {
    throw new Error('error must be implemented')
  }
}
