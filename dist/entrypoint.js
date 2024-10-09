"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fsPromise = fs_1.default.promises;
const pathname = path_1.default.resolve(__dirname, 'jobs');
/**
 * Start worker based on the provided file.
 * @param file The file representing the worker.
 * @param jobsDirectory The directory where worker files are stored.
 */
async function startWorker(filename, jobsDirectory) {
    try {
        // Load all queues from jobs folder
        const q = await Promise.resolve(`${path_1.default.join(jobsDirectory, filename)}`).then(s => __importStar(require(s)));
        const { queueConfig } = q;
        const { queue, handler } = queueConfig;
        // Run the worker handler
        queue.process(async ({ data }) => await handler(data));
    }
    catch (error) {
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
    }
    catch (err) {
        console.error(err);
    }
})();
