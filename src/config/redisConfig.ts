import Redis from 'ioredis';

import serverconfig from './serverConfig';  

const redisConfig = {
    port: serverconfig.REDIS_PORT,
    host: serverconfig.REDIS_HOST,
    maxRetriesPerRequest: null,

}

const redisConnection = new Redis(redisConfig);

export default redisConnection;