import React, { useEffect, useReducer, ReactElement, useContext } from "react";
import { Category, ItemResponse } from "../api/HackerNewsApi";
import { ApiContext } from "../context/ApiContext";

import { LoadMoreMarker } from "../components/LoadMoreMarker";
import { Loader } from "../components/Loader";
import { Items } from "../components/Items";

type InitialStateType = {
  offset: number;
  stories: ItemResponse[];
  isLoading: boolean;
  error: Error | null;
};

const initialState: InitialStateType = {
  offset: 0,
  stories: [],
  isLoading: false,
  error: null,
};

enum Actions {
  incrementOffset,
  fetchStoriesRequest,
  fetchStoriesSuccess,
  fetchStoriesFailure,
}

type ActionsType =
  | { type: Actions.incrementOffset }
  | { type: Actions.fetchStoriesRequest }
  | {
      type: Actions.fetchStoriesSuccess;
      payload: ItemResponse[];
    }
  | {
      type: Actions.fetchStoriesFailure;
      payload: Error;
    };

function reducer(itemLimit: number) {
  return function (state: InitialStateType, action: ActionsType): InitialStateType {
    switch (action.type) {
      case Actions.incrementOffset:
        const additionalOffset = itemLimit - (state.stories.length % itemLimit);
        const offset = additionalOffset + itemLimit + state.offset;
        return { ...state, offset };
      case Actions.fetchStoriesRequest:
        return { ...state, isLoading: true };
      case Actions.fetchStoriesSuccess:
        return {
          ...state,
          stories: [...state.stories, ...action.payload],
          isLoading: false,
          error: null,
        };
      case Actions.fetchStoriesFailure:
        return { ...state, error: action.payload, isLoading: false };
    }
  };
}

type CategoryPagePropsType = { category: Category };
export function CategoryPage({ category }: CategoryPagePropsType): ReactElement {
  const api = useContext(ApiContext);
  const [{ offset, stories, isLoading, error }, dispatch] = useReducer(reducer(api.itemLimit), initialState);

  function fetchStories(): void {
    dispatch({ type: Actions.fetchStoriesRequest });
    api
      .fetchStories(category, offset)
      .then((newStories) =>
        dispatch({
          type: Actions.fetchStoriesSuccess,
          payload: newStories,
        }),
      )
      .catch((error) =>
        dispatch({
          type: Actions.fetchStoriesFailure,
          payload: error,
        }),
      );
  }

  // Load More when offset changes
  useEffect(() => {
    fetchStories();
  }, [offset]);

  return (
    <main className="max-w-4xl mx-auto bg-white px-3">
      <Items stories={stories} />
      {error ? <div>An Error Occured</div> : ""}
      <LoadMoreMarker onIntersect={() => dispatch({ type: Actions.incrementOffset })}>
        {isLoading ? <Loader /> : ""}
      </LoadMoreMarker>
    </main>
  );
}
