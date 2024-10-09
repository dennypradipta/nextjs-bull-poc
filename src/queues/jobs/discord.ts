import axios from 'axios';
import Bull from 'bull';

// Define the queue name
const queueName = 'discord-queue';

// Create a new queue called "webhook-queue".
export const discordQueue = new Bull(queueName, process.env.REDIS_URL || "redis://localhost:6379");

// Listen to the "webhook-queue" events
discordQueue.isReady().then(() => {
  console.log('Discord queue is ready!');
});
discordQueue.on('active', (job) => {
  console.log('Job is active:', job.id);
})
discordQueue.on('completed', (job) => {
  console.log('Job is completed:', job.id);
})

// Create a new worker handler
const webhookHandler = async () => {
  console.log('Sending webhook');

  await axios.post(process.env.DISCORD_URL || '', {
    content: 'Nicely done'
  }, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  })

  console.log('Webhook sent')
}

export const queueConfig = {
  queue: discordQueue,
  handler: webhookHandler
}