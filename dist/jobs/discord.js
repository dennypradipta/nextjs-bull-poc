"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueConfig = exports.discordQueue = void 0;
const axios_1 = __importDefault(require("axios"));
const bull_1 = __importDefault(require("bull"));
// Define the queue name
const queueName = 'discord-queue';
// Create a new queue called "webhook-queue".
exports.discordQueue = new bull_1.default(queueName, process.env.REDIS_URL || "redis://localhost:6379");
// Listen to the "webhook-queue" events
exports.discordQueue.isReady().then(() => {
    console.log('Discord queue is ready!');
});
exports.discordQueue.on('active', (job) => {
    console.log('Job is active:', job.id);
});
exports.discordQueue.on('completed', (job) => {
    console.log('Job is completed:', job.id);
});
// Create a new worker handler
const webhookHandler = async () => {
    console.log('Sending webhook');
    await axios_1.default.post(process.env.DISCORD_URL || '', {
        content: 'Nicely done'
    }, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    });
    console.log('Webhook sent');
};
exports.queueConfig = {
    queue: exports.discordQueue,
    handler: webhookHandler
};
