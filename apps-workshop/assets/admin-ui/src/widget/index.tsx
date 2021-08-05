import { init } from "@datadog/ui-apps-sdk";
import "./../index.css";
import { useState } from "react";

import "./widget.css";
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

export default function Widget() {
  return (
    <section style={{ padding: "10px" }}>
      <h1>Hello world</h1>
    </section>
  );
}
