const Queue = require("bull");
const { sendReminder, sendReminderReview } = require("./sendEmail");

const redisConfig = {
    redis: {
        host: 'redis-10817.c241.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 10817,
    },
};

const reminderQueue = new Queue("reminder", redisConfig);
const reviewQueue = new Queue("review", redisConfig);

reminderQueue.process(async (job) => {
    const { email, cancelLink, reviewLink } = job.data
    sendReminder(email, cancelLink)
    reviewQueue.add({ email, reviewLink }, { delay: 2 * 60 * 60 * 1000})
});

reviewQueue.process(async (job) => {
    const { email, reviewLink } = job.data;
    sendReminderReview(email, reviewLink)
});

module.exports = { reminderQueue };