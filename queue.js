const { Queue } = require("bullmq");
const IORedis = require("ioredis");
require("dotenv").config();

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
});

const campaignQueue = new Queue("campaigns", { connection });

module.exports = { campaignQueue, connection };
