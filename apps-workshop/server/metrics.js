const { v1 } = require("@datadog/datadog-api-client");

let submissionRoutine = null;
let globalRateLimit = 100;

const INTERVAL = 3000;
const configuration = v1.createConfiguration();
const apiInstance = new v1.MetricsApi(configuration);

const users = [
  { email: "chelsea.rolfson@yahoo.com", state: "active" },
  { email: "nfeeney@fadel.com", state: "active" },
  { email: "tschiller@yahoo.com", state: "active" },
  { email: "ptillman@jast.com", state: "active" },
  { email: "oberbrunner.hailie@hotmail.com", state: "active" },
  { email: "lucious14@hotmail.com", state: "active" },
  { email: "doyle.ollie@gmail.com", state: "active" },
  { email: "oconner.rogers@yahoo.com", state: "active" },
  { email: "margret04@langworth.com", state: "active" },
  { email: "nadia10@maggio.com", state: "active" },
];

const submitPoints = () => {
  const now = new Date().getTime() / 1000;
  apiInstance.submitMetrics({
    body: {
      series: users.map((user) => {
        // normal rate is 1
        let value = 1;

        // if the user is banned, drop their usage
        if (user.state === "blocked") {
          value = 0;
        }

        // apply global rate limit
        value = Math.min(value, globalRateLimit);

        // add some randomness for illustrative purposes
        value = value + 0.1 * Math.random();

        return {
          interval: 10,
          metric: "workshop.submissions",
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
