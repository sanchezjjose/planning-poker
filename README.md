# planning-poker
The client and server for the planning poker web application.

The client is single page web app using `React` and `TypeScript`.

The server is running `express`, and serves as the API for the client. It is backed by `redis` (local development only), and will use an `in-memory` cache otherwise.

## Local Development

### Docker

From the `planning-poker` root directory, run the following command to startup client and server:
```
# Run this command also anytime dependencies change
docker-compose build --no-cache
docker-compose up
```

To stop the containers, from the root directory run the following command:
```
docker-compose down
```

After it builds and starts the client and server, you can access the web application in your browser by visiting:
```
http://localhost:3000
```

### Manually

You can also individually run the client / server without docker. Simply cd into `client` and `server` and run:
```
npm install
npm start
```

You should now be able to access the web application by visiting:
```
http://localhost:3000
```

The server will be running on:
```
http://localhost:3001
```

## Deploy

The client is deployed to Netlify on each commit.

The server deploys to GCP with the following command (access required):

```
npm run deploy
```

## Future Enhancements
- Tests!
- Redis to replace in-memory for deployed app
- Development v. Production settings
- HTTPS for local development
- Styled-Components
- Light & Dark Mode
- Optimize for production (ie, Dockerfile to only install production deps or use NODE_ENV=production)
- Delete Polls
- Clear Votes
- Reveal Votes (initially hidden with only persons name displayed)
- Loader Icon
