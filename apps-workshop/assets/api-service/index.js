const {
  startMetricSubmission,
  addToBlocklist,
  setRateLimit,
  getBlockList,
  getRateLimit,
} = require("./telemetry.js");
const { getTweets, postTweet } = require("./tweets.js");

const express = require("express");
var cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

startMetricSubmission();

// FEATURE 1
// BLOCKLIST ACTIONS
app.get("/blocklist", (req, res) => {
  res.json({
    users: getBlockList(),
  });
});

app.post("/blocklist", (req, res) => {
  const email = req.body.email;
  if (!email) {
    return;
  }

  addToBlocklist(email);
  res.send("");
});

// FEATURE 2
// RATE LIMITS
app.get("/limits", (req, res) => {
  res.json({
    limit: getRateLimit(),
  });
});

app.post("/limits", (req, res) => {
  let value = req.body.value;
  if (!isNaN(value)) {
    return res.send("Need a value");
  }

  setRateLimit(value);
  res.send("");
});

// STATUS STREAM
app.get("/tweets", async (req, res) => {
  const tweets = await getTweets();

  res.json({
    tweets,
  });
});

app.post("/tweets", (req, res) => {
  let data = req.body;
  postTweet({
    author: data.author,
    text: data.text,
  });

  res.json({
    success: true,
  });
});

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "/index.html"));
// });

app.use(express.static("demo-ui/build"));

// START LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
