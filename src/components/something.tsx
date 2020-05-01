import React, { useEffect, useState, ReactElement } from "react";
import { HackerNewsApi, IHackerNewsApi, ICategoryResponse } from "../api/HackerNewsApi";

const api: IHackerNewsApi = new HackerNewsApi();

export function Thing(): ReactElement {
  const [stories, setStories] = useState<ICategoryResponse>([])

  useEffect(() => {
    async function loadTopStories() {
      const stories = await api.fetchTopStories();
      setStories(stories);
    }
    loadTopStories();
  }, [])

  return (<h1>{JSON.stringify(stories)}</h1>)
}
