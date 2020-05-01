const baseUrl = "https://hacker-news.firebaseio.com/v0/";

export interface IHackerNewsApi {
  fetchTopStories(): Promise<ICategoryResponse>;
  fetchNewStories(): Promise<ICategoryResponse>;
  fetchBestStories(): Promise<ICategoryResponse>;
  fetchAskStories(): Promise<ICategoryResponse>;
  fetchShowStories(): Promise<ICategoryResponse>;
  fetchJobStories(): Promise<ICategoryResponse>;
}

export interface ICategoryResponse {
  [index: number]: number;
}

interface IItemResponse {
  by?: String;
  deleted?: Boolean;
  dead?: Boolean;
  parent?: Number;
  descendants?: Number;
  id?: Number;
  kids?: Number[];
  score?: Number;
  time?: Number;
  title?: String;
  type?: String;
  url?: String;
}

export class HackerNewsApi implements IHackerNewsApi {
  private async fetchCategory(path: String): Promise<ICategoryResponse> {
    const url = new URL(`${path}stories.json`, baseUrl);
    try {
      let response = await fetch(url.toString());
      return await response.json();
    } catch (err) {
      throw new Error(
        `Failed to fetch ${path} stories\n\nUrl was: ${url}\n\nError is: ${err}`
      );
    }
  }

  async fetchItem(itemId: Number): Promise<IItemResponse> {
    const url = new URL(`item/${itemId}.json`, baseUrl);
    try {
      let response = await fetch(url.toString());
      return await response.json();
    } catch (err) {
      throw new Error(
        `Failed to fetch item ${itemId}\n\nUrl was: ${url}\n\nError is: ${err}`
      );
    }
  }

  async fetchTopStories() {
    return await this.fetchCategory("top");
  }
  async fetchNewStories() {
    return await this.fetchCategory("new");
  }
  async fetchBestStories() {
    return await this.fetchCategory("best");
  }
  async fetchAskStories() {
    return await this.fetchCategory("ask");
  }
  async fetchShowStories() {
    return await this.fetchCategory("show");
  }
  async fetchJobStories() {
    return await this.fetchCategory("job");
  }
}
