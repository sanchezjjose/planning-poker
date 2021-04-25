const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

const cache = require('./src/PollCache').getInstance();
const Poll = require('./src/Poll');

const Connections = require('./src/Connections');
Connections.initSocketIO(server, cache);

// TODO: Create a list of allowed origins instead of allowing all
// app.use(cors({ origin: ['https://planning-poker-es.netlify.app', 'http://localhost:3000'] }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Alternative to using cors middleware
// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.get('/api', async (_, res) => {
  const polls = await cache.getPolls();
  res.json(polls);
});

app.post('/api', async (req, res) => {
  const pollId = req.body.id;
  const pollName = req.body.name;

  if (!pollId) {
    return res.status(500).json({ error: `There was an error attempting to create a poll` });
  }

  if (await cache.has(pollId)) {
    return res.status(400).json({ error: `The poll ${pollId} already exists.` });
  }

  await cache.set(pollId, new Poll(pollId, pollName));
  res.json(await cache.getPolls());
});

app.get('/api/poll/:id', async (req, res) => {
  const pollId = req.params.id;

  if (await cache.has(pollId)) {
    return res.json(await cache.getPoll(pollId));
  }

  res.status(404).send(`Poll ${pollId} does not exist.`);
});

server.listen(port, () => {
  console.log(`Planning poker app listening at http://localhost:${port}`)
});
