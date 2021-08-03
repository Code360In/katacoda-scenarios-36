import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import setup from "./controller";
import SidePanel from "./side-panel";
import Widget from "./widget";

const getContent = () => {
  console.log(window.location.pathname);
  switch (window.location.pathname) {
    case "/widget": {
      return <Widget />;
    }
    case "/panel": {
      return <SidePanel />;
    }
    default: {
      setup();
    }
  }
};

ReactDOM.render(
  <React.StrictMode>{getContent()}</React.StrictMode>,
  document.getElementById("root")
);
