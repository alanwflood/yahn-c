import React from "react";
import ReactDOM from "react-dom";
import { Router } from "./router";

export function Application(): void {
  ReactDOM.render(<Router />, document.getElementById("app"));
}
