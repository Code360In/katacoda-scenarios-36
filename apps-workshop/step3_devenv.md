## Setting up our dev environment

**Logging in our Datadog account**

You shuold be able to see 2 metrics:

1. "[tweets.api.gets](https://app.datadoghq.com/metric/explorer_to_notebook?requestString=avg:tweets.api.gets{*}&group=&size=m&live=true&start=1628001845686&range=3600000)" representing the rate of GET requests broken down by account.
1. "[tweets.api.posted](https://app.datadoghq.com/metric/explorer_to_notebook?requestString=avg:tweets.api.posted{*}&group=&size=m&live=true&start=1628001845686&range=3600000)" representing the count of posted tweets broken down by account.

![Metrics](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Wnu0zK90/f815420a-33a3-4c66-a0da-927f684c1e17.png?v=8b32a354848b98f3dc3a63e0d6149517)

**Install the app libraries**

`cd app; yarn install`{{execute}}

**Start the app dev environment**

`yarn start`{{execute}}

**Preview your app**

[Preview your app here](https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/widget)
