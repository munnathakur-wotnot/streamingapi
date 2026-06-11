const express = require('express');

const app = express();

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let count = 0;

  const interval = setInterval(() => {
    count++;

    res.write(
      `data: ${JSON.stringify({
        message: `Hello ${count}`,
        timestamp: new Date().toISOString(),
      })}\n\n`
    );

    if (count === 10) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

app.listen(8999, () => {
  console.log('Server running on port 8999');
});
