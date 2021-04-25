const RedisCache = require('./RedisCache');
const MemoryCache = require('./MemoryCache');

const Poll = require('./Poll');
const Vote = require('./Vote');

class PollCache {

  /**
   * Initialize as a singleton.
   */
  constructor() {
    if (!PollCache.instance) {
      this.pollsCache = process.env.REDIS_URL ? new RedisCache() : new MemoryCache();

      // Seed data
      (async () => {
        await this.pollsCache.set('jira-123', new Poll('jira-123', 'JIRA 123'));
        await this.pollsCache.set('jira-456', new Poll('jira-456', 'JIRA 456'));
      })();

      PollCache.instance = this;
    }

    return PollCache.instance;
  }

  static getInstance() {
    return PollCache.instance || new PollCache();
  }

  async get(key) {
    return await this.pollsCache.get(key);
  }

  async set(key, val = {}) {
    await this.pollsCache.set(key, val);
  }

  async has(key) {
    return await this.pollsCache.has(key);
  }

  /**
   * Returns a list of all polls by their id and name.
   * @return {Promise<Array.<{id: string, name: string>>} - Array of all polls
   */
  async getPolls() {
    const polls = await this.pollsCache.values();
    return polls.map(poll => ({ id: poll.id, name: poll.name }));
  }

  /**
   * Returns a copy of a poll with it's votes transformed to an array.
   * @param {string} id - The poll id
   * @return {Promise<name: string, votes: Array.<{ voterName: string, voteValue: string }>>} - A poll object with votes converted to Array<Vote>
   */
  async getPoll(id) {
    const pollExists = await this.has(id);
    if (!pollExists) {
      return {};
    }

    const poll = await this.get(id);
    const pollCopy = { ...poll };
    pollCopy.votes = Object.entries(pollCopy.votes).map(([voterName, voteValue]) => new Vote(voterName, voteValue));

    return pollCopy;
  }

  /**
   * Adds a new vote to the poll if it exists.
   * A deep copy of the poll is created, then updated with the new vote,
   * and finally replaces the old value with the new copy.
   * @param {string} id - The poll id
   * @param {Vote} vote - The vote object
   * @return {Promise}
   */
  async addVote(id, vote) {
    const pollExists = await this.has(id);
    if (pollExists) {
      const poll = await this.get(id);
      poll.votes[vote.voterName] = vote.voteValue;
      await this.set(id, poll);
    }
  }
}

module.exports = PollCache;
