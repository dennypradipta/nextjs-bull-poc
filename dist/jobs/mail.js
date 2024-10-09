"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueConfig = exports.mailQueue = void 0;
const bull_1 = __importDefault(require("bull"));
// Define the queue name
const queueName = 'mail-queue';
// Create a new queue called "mail-queue".
exports.mailQueue = new bull_1.default(queueName, process.env.REDIS_URL || "redis://localhost:6379");
// Listen to the "mail-queue" events
exports.mailQueue.isReady().then(() => {
    console.log('Mail queue is ready!');
});
exports.mailQueue.on('active', (job) => {
    console.log('Job is active:', job.id);
});
exports.mailQueue.on('completed', (job) => {
    console.log('Job is completed:', job.id);
});
// Create a new worker handler
const mailHandler = async ({ email }) => {
    console.log('Sending email to:', email);
    // A long running process
    console.log('Email sent!');
};
exports.queueConfig = {
    queue: exports.mailQueue,
    handler: mailHandler
};
