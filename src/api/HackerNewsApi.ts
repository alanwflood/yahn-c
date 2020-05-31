import LRU from "lru-cache";

type ItemId = number;
type ItemsCache = {
  top: ItemId[];
  new: ItemId[];
  best: ItemId[];
  ask: ItemId[];
  show: ItemId[];
  job: ItemId[];
};

export interface HackerNewsApi {
  fetchStories(category: Category, offset: number, limit: number): Promise<ItemResponse[]>;
  fetchItem(itemId: ItemId): Promise<ItemResponse>;
}

export interface ItemResponse {
  by?: string;
  deleted?: boolean;
  dead?: boolean;
  text?: string;
  parent?: number;
  descendants?: number;
  id: number;
  kids?: number[];
  score?: number;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
}

export enum Category {
  TOP = "top",
  NEW = "new",
  BEST = "best",
  ASK = "ask",
  SHOW = "show",
  JOB = "job",
}

export class HackerNewsApi implements HackerNewsApi {
  cache: LRU<string, ItemResponse | ItemId[]>;
  cacheMaxAge: number;
  cachedIds: ItemsCache;
  itemLimit: number;

  constructor(itemLimit = 25) {
    this.itemLimit = itemLimit;
    this.cacheMaxAge = 1000 * 60 * 15; // 15 Minutes

    this.cache = new LRU<string, ItemResponse | ItemId[]>({
      max: Object.keys(Category).length * 500,
      maxAge: this.cacheMaxAge,
    });

    this.cachedIds = {
      top: [],
      new: [],
      best: [],
      ask: [],
      show: [],
      job: [],
    };

    // if (this.cachedIds.top.length === 0) {
    // this.warmCache();
    // }
  }

  // warmCache(): void {
  //   this.fetchStories(Category.TOP, 0, 25);
  //   setTimeout(() => this.warmCache(), this.cacheMaxAge);
  // }

  // Fetch designated item by id
  async fetchItem(itemId: ItemId): Promise<ItemResponse> {
    return (await this.fetchApi(`item/${itemId}.json`)) as ItemResponse;
  }

  // Fetch stories for a designated Category
  async fetchStories(category: Category, offset = 0): Promise<ItemResponse[]> {
    const itemIds = await this.fetchItemIdsForCategory(category);
    const newItems = await this.fetchItems(itemIds, offset, this.itemLimit);
    return newItems.filter(Boolean);
  }

  // Fetch an array of items of a set length
  async fetchItems(items: ItemId[], offset: number, limit: number): Promise<ItemResponse[]> {
    return await Promise.all(items.slice(offset, limit + offset).map(async (item) => await this.fetchItem(item)));
  }

  // Return an array of item id's for a designated category
  private async fetchItemIdsForCategory(category: Category): Promise<ItemId[]> {
    return (await this.fetchApi(`${category}stories.json`)) as ItemId[];
  }

  // Wrap up caching and fetching behaviour for api requests
  private async fetchApi(path: string): Promise<ItemId[] | ItemResponse> {
    const baseUrl = "https://hacker-news.firebaseio.com/v0/";
    // Check if data is in the cache
    if (this.cache.has(path)) {
      const item = this.cache.get(path);
      if (item !== undefined) return Promise.resolve(item);
    }

    // Else Fetch it
    const url = new URL(path, baseUrl);
    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      // Store new data in cache
      this.cache.set(path, data);
      return data;
    } catch (err) {
      throw new Error(`Failed to contact Api for resource.\n\nUrl was: ${url}\n\nError is: ${err}`);
    }
  }
}
