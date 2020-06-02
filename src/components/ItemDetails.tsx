import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { fromUnixTime, formatISO, formatDistanceToNow } from "date-fns";

import { ItemResponse } from "../api/HackerNewsApi";
import { Routes } from "../router";

function DateSincePosted({ unixTimestamp }: { unixTimestamp?: number }): ReactElement | null {
  if (!unixTimestamp) return null;
  const time = fromUnixTime(unixTimestamp);
  return <time dateTime={formatISO(time)}>{formatDistanceToNow(time)} ago</time>;
}
export function ItemDetails({ score, by, id, time, descendants }: ItemResponse): ReactElement {
  return (
    <div>
      {score} Points
      <span className="mx-2">|</span>
      By{" "}
      <Link className="underline" to="somewhere">
        {by}
      </Link>{" "}
      <DateSincePosted unixTimestamp={time} />
      <span className="mx-2">|</span>
      {descendants ? (
        <Link className="underline" to={Routes.Post(id)}>
          {descendants} comments
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
