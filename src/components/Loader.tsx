import React from "react";
import "./Loader.css";

export function Loader(): React.ReactElement {
  return (
    <div className="mx-auto lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
