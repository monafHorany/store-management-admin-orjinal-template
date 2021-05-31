import {
  FETCH_ALL_ORDER_FAIL,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_RESET,
  FETCH_ALL_ORDER_SUCCESS,
} from "../constants/order-constants";

export const FetchAllNewOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDER_REQUEST:
      return { loading: true };
    case FETCH_ALL_ORDER_SUCCESS:
      return { loading: false, success: true };
    case FETCH_ALL_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_ALL_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
