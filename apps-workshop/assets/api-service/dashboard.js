const { v1 } = require("@datadog/datadog-api-client");

const TITLE = "Submissions";

exports.createDashboard = async function(configuration) {
  const apiInstance = new v1.DashboardsApi(configuration);
  const response = await apiInstance.listDashboards({});
  const existingDash = response.dashboards.find((d) => d.title === TITLE);
  if (existingDash) {
    console.log("Found existing dashboard: ", existingDash);
    return;
  }
  const newDash = await apiInstance.createDashboard({
    body: {
      title: TITLE,
      description: "",
      widgets: [
        {
          definition: {
            title: "API Gets",
            titleSize: "16",
            titleAlign: "left",
            showLegend: true,
            legendLayout: "auto",
            legendColumns: ["avg", "min", "max", "value", "sum"],
            type: "timeseries",
            requests: [
              {
                formulas: [{ formula: "query1" }],
                responseFormat: "timeseries",
                onRightYaxis: false,
                queries: [
                  {
                    query: "sum:tweets.api.gets{*} by {user}.as_rate()",
                    dataSource: "metrics",
                    name: "query1",
                  },
                ],
                style: {
                  palette: "dog_classic",
                  lineType: "solid",
                  lineWidth: "normal",
                },
                displayType: "line",
              },
            ],
            yaxis: {
              includeZero: true,
              scale: "linear",
              label: "",
              min: "auto",
              max: "auto",
            },
            markers: [],
          },
          layout: { x: 0, y: 0, width: 8, height: 4 },
        },
        {
          definition: {
            title: "Incoming submissions",
            titleSize: "16",
            titleAlign: "left",
            showLegend: true,
            legendLayout: "auto",
            legendColumns: ["avg", "min", "max", "value", "sum"],
            type: "timeseries",
            requests: [
              {
                formulas: [{ formula: "query1" }],
                responseFormat: "timeseries",
                onRightYaxis: false,
                queries: [
                  {
                    query: "sum:tweets.posted{*} by {user}.as_count()",
                    dataSource: "metrics",
                    name: "query1",
                  },
                ],
                style: {
                  palette: "dog_classic",
                  lineType: "solid",
                  lineWidth: "normal",
                },
                displayType: "bars",
              },
            ],
            yaxis: {
              includeZero: true,
              scale: "linear",
              label: "",
              min: "auto",
              max: "auto",
            },
            markers: [],
          },
          layout: { x: 0, y: 4, width: 8, height: 4 },
        },
      ],
      templateVariables: [],
      layoutType: "ordered",
      restrictedRoles: [],
      notifyList: [],
      reflowType: "fixed",
    },
  });
  console.log("Created a new dashboard:", newDash);
};
