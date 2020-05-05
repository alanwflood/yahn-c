import React, { useEffect, useState, ReactElement, useContext } from "react";
import { Category, ItemResponse } from "../api/HackerNewsApi";
import { ApiContext } from "../context/ApiContext";
import { Item } from "../components/Item";

type CategoryPageProps = { category: Category };
export function CategoryPage({ category }: CategoryPageProps): ReactElement {
  const itemLimit = 25;
  const api = useContext(ApiContext);
  const [stories, setStories] = useState<ItemResponse[]>([]);
  const [offset, setOffset] = useState<number>(0);

  async function fetchStories(): Promise<ItemResponse[]> {
    return api.fetchStories(category, offset, itemLimit);
  }

  function loadMore(): void {
    setOffset((offset) => offset + itemLimit);
  }

  // Load More when offset changes
  useEffect(() => {
    async function loadStories(): Promise<void> {
      const fetchedStories = await fetchStories();
      setStories((prevStories) => [...prevStories, ...fetchedStories]);
    }
    loadStories();
  }, [offset]);

  // Load initial stories when category changes
  useEffect(() => {
    setOffset(0);
    async function loadStories(): Promise<void> {
      const fetchedStories = await fetchStories();
      setStories(fetchedStories);
    }
    loadStories();
  }, [category]);

  return (
    <main>
      <ul>
        {stories.map(({ title, id }) => (
          <Item key={id} id={id} title={title} />
        ))}
      </ul>
      <button onClick={loadMore}>Load More</button>
    </main>
  );
}
