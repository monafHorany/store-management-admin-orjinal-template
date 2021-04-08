import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createNewZoneReducer,
  fetchAllZonesReducer,
  fetchSingleZoneReducer,
  updateZoneReducer,
} from "./reducers/zone-reducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productListByStandIdReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/products-reducer";
import {
  userCreateReducer,
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userUpdateReducer,
} from "./reducers/user-reducers";
import {
  createNewStandReducer,
  fetchAllStandsReducer,
} from "./reducers/stand-reducer";
// const initialState = {
//   sidebarShow: "responsive",
// };

const changeStateReducer = (
  state = { sidebarShow: "responsive" },
  { type, ...rest }
) => {
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
  allStands: fetchAllStandsReducer,
  singleZone: fetchSingleZoneReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productList: productListReducer,
  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  zoneCreate: createNewZoneReducer,
  zoneUpdate: updateZoneReducer,

  standProduct: productListByStandIdReducer,

  standCreate: createNewStandReducer,
});

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
