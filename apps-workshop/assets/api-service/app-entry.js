const fetch = require("node-fetch");

const APP_NAME = "Workshop app";

exports.createAppEntry = async function(configuration) {
  let response = await fetch("https://app.datadoghq.com/api/v1/ui_app", {
    headers: {
      "DD-API-KEY": configuration.authMethods.apiKeyAuth.apiKey,
      "DD-APPLICATION-KEY": configuration.authMethods.appKeyAuth.apiKey,
    },
  });
  let data = await response.json();

  const existingApp = data.ui_apps.find((app) => {
    return app.app_manifest.name === APP_NAME;
  });

  if (existingApp) {
    console.log("Found existing app: ", existingApp);
    return;
  }

  response = await fetch("https://app.datadoghq.com/api/v1/ui_app", {
    headers: {
      "content-type": "application/json",
      "DD-API-KEY": configuration.authMethods.apiKeyAuth.apiKey,
      "DD-APPLICATION-KEY": configuration.authMethods.appKeyAuth.apiKey,
    },
    body: JSON.stringify({
      app_manifest: {
        scopes: [],
        main_url: "https://YOUR-URL.environments.katacoda.com",
        description:
          "A hello-world like application used as a starting point for apps",
        dev_mode_url: "http://localhost:3000",
        name: "Workshop app",
        features: [
          {
            name: "dashboard_custom_widget",
            options: {
              widgets: [
                {
                  source: "widget",
                  options: [],
                  custom_widget_key: "admin-ui",
                  name: "Admin UI",
                  icon: "https://static.datadoghq.com/static/favicon.ico",
                },
              ],
            },
          },
          { name: "side_panels", options: {} },
          { name: "widget_context_menu", options: {} },
        ],
        api_version: "v1.0",
        icon: "https://static.datadoghq.com/static/favicon.ico",
      },
      stability: "stable",
    }),
    method: "POST",
  });
  data = await response.json();
  console.log("Created new app:", data);
};
