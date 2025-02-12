import Redis from 'ioredis';
// const host = "redis-16084.crce179.ap-south-1-1.ec2.redns.redis-cloud.com";
// const port = 16084;
// const password = "YDCbC5LSDVymMHuFaLyhW9LSx80q8sG1";

const redisClient = new Redis({
    // host: host,
    // port: port,
    // password: password,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,

});

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redisClient;
