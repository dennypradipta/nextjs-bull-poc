import Bull from 'bull';

type TPushNotificationData = {
  id: string;
};

// Define the queue name
const queueName = 'push-notification-queue';

// Create a new queue called "push-notification-queue".
export const pushNotificationQueue = new Bull(queueName, process.env.REDIS_URL || "redis://localhost:6379");

// Listen to the "push-notification-queue" events
pushNotificationQueue.isReady().then(() => {
  console.log('Push notification queue is ready!');
});
pushNotificationQueue.on('active', (job) => {
  console.log('Job is active:', job.id);
})
pushNotificationQueue.on('completed', (job) => {
  console.log('Job is completed:', job.id);
})

// Create a new worker handler
const pushNotificationHandler = async ({ id }: TPushNotificationData) => {
  console.log('Sending push notification to device ID:', id);

  // A long running process

  console.log('Notification sent sent!');
}

export const queueConfig = {
  queue: pushNotificationQueue,
  handler: pushNotificationHandler
}