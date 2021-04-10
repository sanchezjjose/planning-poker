const Poll = require('./Poll');
const Vote = require('./Vote');

class PollCacheMap {

  /**
   * Initialize as a singleton.
   */
  constructor() {
    if (!PollCacheMap.instance) {
      // Temporary in-memory cache
      // Replace with redis adapter: https://socket.io/docs/v4/server-initialization/
      this.pollsCache = new Map();

      // Initializing for seed data
      this.pollsCache.set('jira-123', new Poll('jira-123', 'JIRA 123'));
      this.pollsCache.set('jira-456', new Poll('jira-456', 'JIRA 456'));

      PollCacheMap.instance = this;
    }

    return PollCacheMap.instance;
  }

  static getInstance() {
    return PollCacheMap.instance || new PollCacheMap();
  }

  get(key) {
    return this.pollsCache.get(key);
  }

  set(key, val = {}) {
    this.pollsCache.set(key, val);
  }

  has(key) {
    return this.pollsCache.has(key);
  }

  /**
   * Returns a list of all polls by their id and name.
   * @return {Array.<{id: string, name: string>} - Array of all polls
   */
  getPolls() {
    return Array
      .from(this.pollsCache.values())
      .map(poll => {
        return { id: poll.id, name: poll.name };
      });
  }

  /**
   * Returns a copy of a poll with it's votes transformed to an array.
   * @param {string} id - The poll id
   * @return {name: string, votes: Array.<{ voterName: string, voteValue: string }>} - A poll object with votes converted to Array<Vote>
   */
  getPoll(id) {
    if (!this.has(id)) {
      return {};
    }

    const poll = { ...this.get(id) };
    poll.votes = Object.entries(poll.votes).map(([voterName, voteValue]) => new Vote(voterName, voteValue));

    return poll;
  }

  /**
   * Adds a new vote to the poll if it exists.
   * A deep copy of the poll is created, then updated with the new vote,
   * and finally replaces the old value with the new copy.
   * @param {string} id - The poll id
   * @param {Vote} vote - The vote object
   * @return {void}
   */
  addVote(id, vote) {
    if (this.has(id)) {
      const poll = JSON.parse(JSON.stringify(this.get(id)));
      poll.votes[vote.voterName] = vote.voteValue;
      this.set(id, poll);
    }
  }
}

module.exports = PollCacheMap;
