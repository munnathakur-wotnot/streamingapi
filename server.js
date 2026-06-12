const express = require("express");
const app = express();

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const events = [
    {
      event: "message_start",
      data: {
        id: "msg_123",
        role: "assistant",
      },
    },

    {
      event: "content_block_start",
      data: {
        index: 0,
        type: "text",
      },
    },

    {
      event: "content_block_delta",
      data: {
        text: "Hello",
      },
    },

    {
      event: "content_block_delta",
      data: {
        text: " there",
      },
    },

    {
      event: "content_block_delta",
      data: {
        text: "! How",
      },
    },

    {
      event: "content_block_delta",
      data: {
        text: " are you?",
      },
    },

    {
      event: "content_block_stop",
      data: {
        index: 0,
      },
    },

    {
      event: "tool_call_start",
      data: {
        tool: "weather",
        location: "Ahmedabad",
      },
    },

    {
      event: "tool_call_delta",
      data: {
        progress: "50%",
      },
    },

    {
      event: "tool_call_result",
      data: {
        temperature: "36°C",
        condition: "Sunny",
      },
    },

    {
      event: "tool_call_stop",
      data: {},
    },

    {
      event: "thinking",
      data: {
        text: "Generating final response...",
      },
    },

    {
      event: "response_metadata",
      data: {
        model: "gpt-test",
        tokens: 145,
      },
    },

    {
      event: "message_stop",
      data: {
        reason: "end_turn",
      },
    },
  ];

  let index = 0;

  const interval = setInterval(() => {
    if (index >= events.length) {
      clearInterval(interval);
      res.end();
      return;
    }

    const current = events[index];

    res.write(`event: ${current.event}\n`);
    res.write(`data: ${JSON.stringify(current.data)}\n\n`);

    index++;
  }, 800);

  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log("Streaming server running on port 3000");
});
