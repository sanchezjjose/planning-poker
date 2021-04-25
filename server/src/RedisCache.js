const redis = require('redis');
const { promisify } = require('util');

class RedisCache {

  constructor(host = process.env.REDIS_URL, port = 6379) {
    const client = redis.createClient({ host, port });
    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.keysAsync = promisify(client.keys).bind(client);
  }

  async get(key) {
    return JSON.parse(await this.getAsync(key));
  }

  async set(key, val) {
    await this.setAsync(key, JSON.stringify(val));
  }

  async has(key) {
    return await this.get(key) !== null;
  }

  async values() {
    const keys = await this.keysAsync('*');
    return Promise.all(keys.map(async (key) => await this.get(key)));
  }
}

module.exports = RedisCache;
