import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { socketMiddleware } from "./middleware/ws-middleware";
import { wsActions } from "./actions/ws-actions";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
);
