import React from "react";
import { ItemResponse } from "../api/HackerNewsApi";

export function Comments({ comments }: { comments: ItemResponse[] }): React.ReactElement {
  return (
    <ul className="bg-white shadow-lg px-3">
      {comments.map((comment: ItemResponse) => (
        <li key={comment.id}>
          {comment.text ? <div dangerouslySetInnerHTML={{ __html: comment.text }} /> : null}
          <strong>{comment.by}</strong>
        </li>
      ))}
    </ul>
  );
}
