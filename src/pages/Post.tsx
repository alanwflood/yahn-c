import React, { useState, useContext, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { ItemDetails } from "../components/ItemDetails";
import { ItemResponse } from "../api/HackerNewsApi";

function PostTitle({ url, title }: { url?: string; title?: string }) {
  return (
    <h1 className="text-2xl font-semibold">
      {url ? (
        <a href={url} rel="noreferrer noopener nofollow" className="hover:underline">
          {title}
        </a>
      ) : (
        title
      )}
    </h1>
  );
}

function htmlify(text: string): string {
  const parent = document.createElement("div");
  parent.innerHTML = text;

  const linkTags = parent.querySelectorAll("a");
  Array.prototype.slice.call(linkTags).forEach((a: HTMLAnchorElement) => {
    a.rel = "noreferrer noopener nofollow";
    a.target = "_blank";
    a.className = "underline text-blue-500";
  });

  const contentTags = parent.querySelectorAll("p");
  Array.prototype.slice.call(contentTags).forEach((content: HTMLElement) => {
    content.className = "mt-3 leading-snug";
  });
  return parent.innerHTML;
}

export function PostPage(): ReactElement | null {
  const api = useContext(ApiContext);
  const { postId } = useParams();
  const [post, setPost] = useState<ItemResponse | null>(null);
  const [kids, setKids] = useState<ItemResponse[]>([]);

  useEffect(() => {
    api.fetchItem(postId).then((p) => setPost(p));
  });

  useEffect(() => {
    if (post?.kids) {
      api.fetchItems(post.kids, 0, 25).then((k: ItemResponse[]) => setKids(k || []));
    }
  }, [post]);

  if (post === null) return null;

  return (
    <div>
      <article className="mb-12 mt-4 bg-white shadow-lg px-3 pb-8 pt-3">
        <PostTitle url={post.url} title={post.title} />
        <ItemDetails id={post.id} score={post.score} by={post.by} time={post.time} hideComments />
        {post.text ? <div className="mt-2" dangerouslySetInnerHTML={{ __html: htmlify(post.text) }} /> : null}
      </article>
    </div>
  );
}
