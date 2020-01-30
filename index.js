import express from 'express';

const app = express();

app.get('/heartbeat', (req, res) => {
  res.send('Hello World');
});
