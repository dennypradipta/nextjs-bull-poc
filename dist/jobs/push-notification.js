"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueConfig = exports.pushNotificationQueue = void 0;
const bull_1 = __importDefault(require("bull"));
// Define the queue name
const queueName = 'push-notification-queue';
// Create a new queue called "push-notification-queue".
exports.pushNotificationQueue = new bull_1.default(queueName, process.env.REDIS_URL || "redis://localhost:6379");
// Listen to the "push-notification-queue" events
exports.pushNotificationQueue.isReady().then(() => {
    console.log('Push notification queue is ready!');
});
exports.pushNotificationQueue.on('active', (job) => {
    console.log('Job is active:', job.id);
});
exports.pushNotificationQueue.on('completed', (job) => {
    console.log('Job is completed:', job.id);
});
// Create a new worker handler
const pushNotificationHandler = async ({ id }) => {
    console.log('Sending push notification to device ID:', id);
    // A long running process
    console.log('Notification sent sent!');
};
exports.queueConfig = {
    queue: exports.pushNotificationQueue,
    handler: pushNotificationHandler
};
