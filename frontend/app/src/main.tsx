import { render } from "preact";
import { App } from "@/app";
import { installAppStyles } from "@/stylesheets";

const mountNode = document.getElementById("app");

if (!mountNode) {
  throw new Error("Missing #app mount node.");
}

installAppStyles();
render(<App />, mountNode);
