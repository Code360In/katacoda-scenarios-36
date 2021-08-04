import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import setup from "./controller";
import SidePanel from "./side-panel";
import TweetStream from "./tweet-stream";
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
    case "/tweets": {
      return <TweetStream />;
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
