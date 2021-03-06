const socketIO = require('socket.io');
const Vote = require('./Vote');
const Poll = require('./Poll');

function initSocketIO(server, pollCache) {
  const io = socketIO(server, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

  io.on('connection', (socket) => {
    console.log('Client Connected');

    // TODO: namespace
    socket.on('vote', async (pollId, voterName, voteValue) => {
      await pollCache.addVote(pollId, new Vote(voterName, voteValue));
      io.sockets.emit('poll-updated', await pollCache.getPoll(pollId));
    });

    socket.on('votes-clear', async (pollId, pollName) => {
      await pollCache.set(pollId, new Poll(pollId, pollName));
      io.sockets.emit('poll-cleared', await pollCache.getPoll(pollId));
    });

    socket.on('votes-reveal', (shouldReveal) => {
      io.sockets.emit('poll-reveal-votes', shouldReveal);
    });

    socket.on('disconnect', () => {
      console.log('Client Disconnected')
    });
  });
}

module.exports = {
  initSocketIO
};
