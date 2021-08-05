import { init } from "@datadog/ui-apps-sdk";
import "./../index.css";
import { useState } from "react";

import "./widget.css";
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

const client = init({ debug: true });

const setRateLimit = (value: number) => {
  fetch("http://localhost:3001/limits", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
    }),
  });
};

export default function Widget() {
  const onOpenSidePanel = (args: any) => {
    client.sidePanel.open(
      {
        source: "panel",
        key: "custom-side-panel",
        title: "Custom Sidepanel",
      },
      {}
    );
  };

  // Start here
  // Workshop step #6. Remove the lines below.
  return (
    <section style={{ padding: "10px" }}>
      <h1>Hello world</h1>
    </section>
  );
  // Workshop step #6. Remove the lines above.
  // End here

  return (
    <section style={{ padding: "10px" }}>
      <div className="container-fluid">
        <div> Search Endpoint configuration</div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setRateLimit(0.3);
            }}
          >
            Enable sampling (30%)
          </button>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setRateLimit(1);
            }}
          >
            Disable sampling
          </button>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setRateLimit(0);
            }}
          >
            Drop all requests
          </button>
        </div>

        <div className="row">
          <div> Users</div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenSidePanel}
          >
            Block user
          </button>
        </div>
      </div>
    </section>
  );
}
