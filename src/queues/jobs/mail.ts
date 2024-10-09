import Bull from 'bull';

type TMailQueueData = {
  email: string;
};

// Define the queue name
const queueName = 'mail-queue';

// Create a new queue called "mail-queue".
export const mailQueue = new Bull(queueName, process.env.REDIS_URL || "redis://localhost:6379");

// Listen to the "mail-queue" events
mailQueue.isReady().then(() => {
  console.log('Mail queue is ready!');
});
mailQueue.on('active', (job) => {
  console.log('Job is active:', job.id);
})
mailQueue.on('completed', (job) => {
  console.log('Job is completed:', job.id);
})

// Create a new worker handler
const mailHandler = async ({ email }: TMailQueueData) => {
  console.log('Sending email to:', email);

  // A long running process

  console.log('Email sent!');
}

export const queueConfig = {
  queue: mailQueue,
  handler: mailHandler
}