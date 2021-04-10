const socketIO = require('socket.io');
const Poll = require('./Poll');
const Vote = require('./Vote')

function initSocketIO(server, pollCache) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client Connected');

    socket.on('vote', (pollId, voterName, voteValue) => {
      pollCache.addVote(pollId, new Vote(voterName, voteValue));
      io.sockets.emit('poll-updated', pollCache.getPoll(pollId));
    });

    socket.on('disconnect', () => {
      console.log('Client Disconnected')
    });
  });
}

module.exports = {
  initSocketIO
};
