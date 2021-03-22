import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  fetchAllZonesReducer,
  fetchSingleZoneReducer,
} from "./reducers/zone-reducer";
import {
  productCreateReducer,
  productListReducer,
} from "./reducers/products-reducer";
const initialState = {
  sidebarShow: "responsive",
};

const changeStateReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
const middleware = [thunk];

const reducer = combineReducers({
  changeState: changeStateReducer,
  allZones: fetchAllZonesReducer,
  singleZone: fetchSingleZoneReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
});

const store = createStore(
  reducer,
  // changeState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
