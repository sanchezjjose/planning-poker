const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

const Connections = require('./src/Connections');
const pollCache = require('./src/PollCacheMap').getInstance();
const Poll = require('./src/Poll');

Connections.initSocketIO(server, pollCache);

// TODO: Create a list of allowed origins instead of allowing all
// app.use(cors({ origin: ['https://planning-poker-es.netlify.app', 'http://localhost:3000'] }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Alternative to using cors middleware
// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.set('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.get('/api', (_, res) => {
  res.json(pollCache.getPolls());
});

app.post('/api', (req, res) => {
  const pollId = req.body.id;
  const pollName = req.body.name;

  if (!pollId) {
    return res.status(500).json({ error: `There was an error attempting to create a poll` });
  }

  if (pollCache.has(pollId)) {
    return res.status(400).json({ error: `The poll ${pollId} already exists.` });
  }

  pollCache.set(pollId, new Poll(pollId, pollName));
  res.json(pollCache.getPolls());
});

app.get('/api/poll/:id', (req, res) => {
  const pollId = req.params.id;

  if (pollCache.has(pollId)) {
    return res.json(pollCache.getPoll(pollId));
  }

  res.status(404).send(`Poll ${pollId} does not exist.`);
});

server.listen(port, () => {
  console.log(`Planning poker app listening at http://localhost:${port}`)
});
