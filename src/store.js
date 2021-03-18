import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const initialState = {
  sidebarShow: 'responsive'
}

const changeStateReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}
const middleware = [thunk];



const reducer = combineReducers({
  changeState: changeStateReducer,
});

const store = createStore(
  reducer,
  // changeState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store