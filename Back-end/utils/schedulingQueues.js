const Queue = require("bull");
const { sendReminder, sendReminderReview } = require("./sendEmail");

const redisConfig = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
};

const reminderQueue = new Queue("reminder", redisConfig);
const reviewQueue = new Queue("review", redisConfig);

reminderQueue.process(async (job) => {
    const { email, bookID, cwSpaceID } = job.data
    sendReminder(email, bookID)
    reviewQueue.add({ email, cwSpaceID }, { delay: 2 * 60 * 60 * 1000})
});
 
reviewQueue.process(async (job) => {
    const { email, cwSpaceID } = job.data;
    sendReminderReview(email, cwSpaceID);
});

module.exports = { reminderQueue };