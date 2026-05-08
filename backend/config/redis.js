import redis from 'redis';

/**
 * Redis Configuration Module
 * Handles caching for menu items and session management
 */

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD || undefined,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500)
  }
});

redisClient.on('connect', () => {
  console.log('✅ Redis Connected Successfully');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err.message);
});

// Connect to Redis
try {
  await redisClient.connect();
} catch (error) {
  console.warn('⚠️ Redis not available. Running without caching.');
}

export default redisClient;
