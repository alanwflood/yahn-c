import React, { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../router";
import { ItemResponse } from "../api/HackerNewsApi";
import { ItemDetails } from "./ItemDetails";
import { IntersectionObserverComponent } from "./IntersectionObserver";

export function Items({
  stories,
  loadMoreOffset,
  loadMoreCallback,
}: {
  stories: ItemResponse[];
  loadMoreOffset: number;
  loadMoreCallback: () => void;
}): ReactElement {
  return (
    <ol>
      {stories.map((story, index) => {
        const atOffset = index === stories.length - 1 - loadMoreOffset;
        return (
          <Fragment key={story.id}>
            <Item index={index + 1} story={story} />
            {atOffset ? <IntersectionObserverComponent onIntersect={loadMoreCallback} /> : ""}
          </Fragment>
        );
      })}
    </ol>
  );
}

function Title({ url, id, title }: ItemResponse) {
  const classList = "text-lg hover:underline font-semibold";
  if (url) {
    return (
      <a rel="noopener noreferrer nofollow" target="_blank" className={classList} href={url}>
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

function Item({ index, story }: { index: number; story: ItemResponse }): ReactElement {
  const { by, title, id, time, descendants, score, url } = story;
  return (
    <li className="border-b-2 flex items-center px-4 py-4">
      <div className="w-16 text-center">
        <div className="text-2xl font-bold text-orange-400">{index}</div>
      </div>

      <div className="flex-1 pl-5">
        <Title url={url} id={id} title={title} />
        <ItemDetails score={score} id={id} time={time} descendants={descendants} by={by} />
      </div>
    </li>
  );
}
