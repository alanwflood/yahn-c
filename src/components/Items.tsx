import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../router";
import { ItemResponse } from "../api/HackerNewsApi";
import { fromUnixTime, formatDistanceToNow, formatISO } from "date-fns";

export function Items({ stories }: { stories: ItemResponse[] }): ReactElement {
  return (
    <ol>
      {stories.map((story, index) => (
        <Item index={index + 1} key={story.id} story={story} />
      ))}
    </ol>
  );
}

function Title({ url, id, title }: ItemResponse) {
  const classList = "text-lg hover:underline font-semibold";
  if (url) {
    return (
      <a rel="noopener noreferrer" target="_blank" className={classList} href={url}>
        {title}
      </a>
    );
  }

  return (
    <Link className={classList} to={Routes.Post(id)}>
      {title}
    </Link>
  );
}

function Details({ score, by, id, time, descendants = 0 }: ItemResponse) {
  return (
    <div className="text-xs">
      {score} Points
      <span className="mx-2">|</span>
      By{" "}
      <Link className="underline" to="somewhere">
        {by}
      </Link>{" "}
      <DateSincePosted unixTimestamp={time} />
      <span className="mx-2">|</span>
      <Link className="underline" to={Routes.Post(id)}>
        {descendants} comments
      </Link>
    </div>
  );
}

function Item({ index, story }: { index: number; story: ItemResponse }): ReactElement {
  const { by, title, id, time, descendants, score, url } = story;
  return (
    <li className="border-b-2 flex items-center px-4 py-4">
      <div className="w-16 text-center">
        <div className="text-2xl font-bold text-orange-400">{index}</div>
      </div>

      <div className="flex-1 pl-5">
        <Title url={url} id={id} title={title} />
        <Details score={score} id={id} time={time} descendants={descendants} by={by} />
      </div>
    </li>
  );
}

function DateSincePosted({ unixTimestamp }: { unixTimestamp?: number }): ReactElement | null {
  if (!unixTimestamp) return null;
  const time = fromUnixTime(unixTimestamp);
  return <time dateTime={formatISO(time)}>{formatDistanceToNow(time)} ago</time>;
}
