const { v1 } = require("@datadog/datadog-api-client");

let submissionRoutine = null;
let globalRateLimit = 100;

const INTERVAL = 3000;
const configuration = v1.createConfiguration();
const apiInstance = new v1.MetricsApi(configuration);

const users = [
  // Posting too many tweets
  { email: "nfeeney@fadel.com", role: "post-spam", state: "active" },
  // Likely a bot crawling the api
  { email: "lucious14@hotmail.com", role: "get-spam", state: "active" },
  { email: "chelsea.rolfson@yahoo.com", role: "user", state: "active" },
  { email: "tschiller@yahoo.com", role: "user", state: "active" },
  { email: "ptillman@jast.com", role: "user", state: "active" },
  { email: "oberbrunner.hailie@hotmail.com", role: "user", state: "active" },
  { email: "doyle.ollie@gmail.com", role: "user", state: "active" },
  { email: "oconner.rogers@yahoo.com", role: "user", state: "active" },
  { email: "margret04@langworth.com", role: "user", state: "active" },
  { email: "nadia10@maggio.com", role: "user", state: "active" },
];

const submitPoints = () => {
  const now = new Date().getTime() / 1000;

  // Tweets posted
  apiInstance.submitMetrics({
    body: {
      series: users
        .map((user) => {
          // basically 5% chance of submitting a tweet
          let value = Math.random() < 0.05 ? 1 : 0;

          if (user.role === "post-spam") {
            value = 5;
          }

          // if the user is banned, drop their usage
          if (user.state === "blocked") {
            value = 0;
          }

          return {
            metric: "tweets.posted",
            points: [[now, value]],
            tags: [`user:${user.email}`],
            type: "count",
          };
        })
        // skip counts with 0 value
        .filter((submission) => submission.points[0][1] > 0),
    },
  });

  // API gets
  apiInstance.submitMetrics({
    body: {
      series: users.map((user) => {
        // normal rate is 1
        let value = 1;

        if (user.role === "get-spam") {
          value = 5;
        }

        // apply global rate limit
        value = Math.min(value, globalRateLimit);

        // add some randomness for illustrative purposes
        value = value + 0.1 * Math.random();

        return {
          interval: 3,
          metric: "tweets.api.gets",
          points: [[now, value]],
          tags: [`user:${user.email}`],
          type: "rate",
        };
      }),
    },
  });
};

exports.startMetricSubmission = () => {
  if (submissionRoutine) {
    return;
  }
  submissionRoutine = setInterval(submitPoints, INTERVAL);
};

exports.addToBlocklist = (email) => {
  const user = users.find((u) => u.email === email);
  if (!user) {
    return;
  }
  user.state = "blocked";
};

exports.getBlockList = () => {
  return users.filter((u) => u.state === "blocked").map((u) => u.email);
};

exports.getRateLimit = () => {
  return globalRateLimit;
};

exports.setRateLimit = (value) => {
  console.log(`Setting rate limit to ${value}`);
  globalRateLimit = value;
};
