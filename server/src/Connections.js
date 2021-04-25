const socketIO = require('socket.io');
const Vote = require('./Vote')

function initSocketIO(server, pollCache) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client Connected');

    socket.on('vote', async (pollId, voterName, voteValue) => {
      await pollCache.addVote(pollId, new Vote(voterName, voteValue));
      io.sockets.emit('poll-updated', await pollCache.getPoll(pollId));
    });

    socket.on('disconnect', () => {
      console.log('Client Disconnected')
    });
  });
}

module.exports = {
  initSocketIO
};
