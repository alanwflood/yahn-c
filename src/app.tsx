import * as React from "react";
import * as ReactDOM from "react-dom";
import { Thing } from "./components/something";

export function Application() {
  ReactDOM.render(
    <Thing />,
    document.getElementById("app")
  );
}
