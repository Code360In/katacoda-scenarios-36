## Creating your first widget

- Open [https://app.datadoghq.com/apps](https://app.datadoghq.com/apps) and click on `New app`
- Fill in app name and description
- Click on `UI Extensions` to see the various ways you can extend the Datadog UI. We'll enable `Dashboard custom widget`

![custom widget](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/JruxlOGg/4d54f96f-836f-47b1-a5eb-52c029409bd2.png?source=viewer&v=ac8102c37597f8125d9f78e8e8ec0c65)

- Set the `Root URL` [hello world app](https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/widget) currently running

![root-url](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/RBuLNnDp/521687f9-6dbd-4a78-802a-51fdb482b805.png?source=viewer&v=66b9f42cfa293c48c443b7856cd6b1f2)

- Customize widget name and icon

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

- Create a new dashboard and add a new widget, you should be able to see `Admin UI` which we just created
  ![admin-ui](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/RBuLNnAX/d9b0a7bf-f7d2-4120-a366-3ceeee0cccc7.png?source=viewer&v=bfb4f45589df4b6b193edc93e1eacf13)

- You should be able to drag the widget on the board and confirm the welcome message is showing

  ![admin-ui-widget](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/qGuJ17LE/67fcbe39-5d2c-4a8a-9e96-76ed30dadb99.png?source=viewer&v=6ecc220f2df9cee13a80ff810f2ac02b)
