const { promisify } = require("util");
const express = require("express");
const redis = require("redis");

const client = redis.createClient();

const rIncr = promisify(client.incr).bind(client);

const init = async () => {
  const app = express();

  app.get("/pageview", async (req, res) => {
    const views = await rIncr("pageviews"); //pageviews is the name of the key in redis

    res.json({
      status: "ok",
      views,
    });
  });

  const PORT = 3000;
  app.use(express.static("./static"));
  app.listen(PORT);
  console.log(`running on http://localhost:${PORT}`);
};

init();
