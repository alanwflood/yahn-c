import React from "react";
import { HackerNewsApi } from "../api/HackerNewsApi";

const api = new HackerNewsApi();
export const ApiContext = React.createContext(api);
