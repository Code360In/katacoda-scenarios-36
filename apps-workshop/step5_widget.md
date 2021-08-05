## Creating your first widget

1. Open [https://app.datadoghq.com/apps](https://app.datadoghq.com/apps) and click on `New app`
2. Fill in app name and description
3. Click on `UI Extensions` to see the various ways you can extend the Datadog UI. We'll enable `Dashboard custom widget`

![custom widget](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/JruxlOGg/4d54f96f-836f-47b1-a5eb-52c029409bd2.png?source=viewer&v=ac8102c37597f8125d9f78e8e8ec0c65)

4. Set the `Root URL` [hello world app](https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/widget) currently running

![root-url](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/v1u06gL7/be907fb1-4003-4039-b615-6f8e68f18646.png?source=viewer&v=7c00c328308405829935760373363b26)

5. Customize widget name and icon

```
{
      "name": "dashboard_custom_widget",
      "options": {
        "widgets": [
          {
            "source": "widget",
            "custom_widget_key": "admin-ui",
            "options": [],
            "name": "Admin UI",
            "icon": "https://static.datadoghq.com/static/favicon.ico"
          }
        ]
      }
    }
```

6. Create a new dashboard and add a new widget, you should be able to see `Admin UI` which we just created
   ![admin-ui](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/RBuLNnAX/d9b0a7bf-f7d2-4120-a366-3ceeee0cccc7.png?source=viewer&v=bfb4f45589df4b6b193edc93e1eacf13)
