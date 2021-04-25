class MemoryCache {

  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, val) {
    this.cache.set(key, val);
  }

  has(key) {
    return this.cache.has(key);
  }

  values() {
    const result = Array.from(this.cache.values());
    return result;
  }
}

module.exports = MemoryCache;
