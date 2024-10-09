import path from 'path';
import fs from 'fs';
import type { Job } from 'bull';

const fsPromise = fs.promises;

const pathname = path.resolve(__dirname, 'jobs');

/**
 * Start worker based on the provided file.
 * @param file The file representing the worker.
 * @param jobsDirectory The directory where worker files are stored.
 */
async function startWorker(filename: string, jobsDirectory: string) {
  try {
    // Load all queues from jobs folder
    const q = await import(path.join(jobsDirectory, filename));
    const { queueConfig } = q;
    const { queue, handler } = queueConfig;

    // Run the worker handler
    queue.process(async ({ data }: Job) => await handler(data));
  } catch (error) {
    console.error(`Error loading queue ${filename}:`, error);
  }
}

/**
 * Initializes all workers found in the specified directory.
 */
(async function () {
  try {
    console.info('Starting workers...');
    const files = await fsPromise.readdir(pathname);
    files.forEach((file) => startWorker(file, pathname));
  } catch (err) {
    console.error(err);
  }
})();
