import React, { ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import { CategoryPage } from "./pages/Category";
import { PostPage } from "./pages/Post";
import { HackerNewsApi, Category } from "./api/HackerNewsApi";
import { Header } from "./components/Header";

export const Routes = {
  Top: "/",
  Ask: "/ask",
  Best: "/best",
  Job: "/job",
  New: "/new",
  Show: "/show",
  Post: (postId: number | string): string => `/post/${postId}`,
};

type CategorySet = {
  path: string;
  category: Category;
};
const categories: CategorySet[] = [
  { path: Routes.Top, category: Category.TOP },
  { path: Routes.Best, category: Category.BEST },
  { path: Routes.New, category: Category.NEW },
  { path: Routes.Show, category: Category.SHOW },
  { path: Routes.Ask, category: Category.ASK },
  { path: Routes.Job, category: Category.JOB },
];

export function Router(): ReactElement {
  return (
    <ApiContext.Provider value={new HackerNewsApi()}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-400">
          <Header />
          <Switch>
            {categories.map(({ path, category }) => (
              <Route exact key={path} path={path}>
                <CategoryPage category={category} />
              </Route>
            ))}
            <Route path={Routes.Post(":postId")}>
              <PostPage />
            </Route>
            <Route>
              <h1>Route not found!</h1>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}
