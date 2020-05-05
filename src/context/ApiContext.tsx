import React from "react";
import { HackerNewsApi } from "../api/HackerNewsApi";
export const ApiContext = React.createContext(new HackerNewsApi());
