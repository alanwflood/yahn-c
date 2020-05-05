import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../router";
import { ItemResponse } from "../api/HackerNewsApi";

export function Item({ title, id }: ItemResponse): ReactElement {
  return (
    <li>
      <Link to={Routes.Post(id)}>{title}</Link>
    </li>
  );
}
