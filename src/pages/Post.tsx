import React, { useState, useContext, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { ItemResponse } from "../api/HackerNewsApi";

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
      <h1>
        <a href={post.url} rel="noreferrer noopener nofollow">
          {post.title}
        </a>
      </h1>
      <ul>
        {kids.map((c) => (
          <li key={c.id}>
            {c.text ? <div dangerouslySetInnerHTML={{ __html: c.text }} /> : null}
            <strong>{c.by}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
