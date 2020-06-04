import React from "react";

export function Loader(): React.ReactElement {
  return (
    <div className="mx-auto loader-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
