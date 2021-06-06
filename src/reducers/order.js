import {
  FETCH_ALL_ORDER_FAIL,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_RESET,
  FETCH_ALL_ORDER_SUCCESS,
  FETCH_ORDER_BY_ID_FAIL,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_RESET,
  FETCH_ORDER_BY_ID_SUCCESS,
  PROCESS_NEW_BILL_FAIL,
  PROCESS_NEW_BILL_REQUEST,
  PROCESS_NEW_BILL_RESET,
  PROCESS_NEW_BILL_SUCCESS,
} from "../constants/order-constants";

export const FetchAllNewOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDER_REQUEST:
      return { loading: true };
    case FETCH_ALL_ORDER_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case FETCH_ALL_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_ALL_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const FetchOrderByIdReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_ORDER_BY_ID_REQUEST:
      return { loading: true };
    case FETCH_ORDER_BY_ID_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case FETCH_ORDER_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_ORDER_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};
export const ProcessNewBillReducer = (state = {}, action) => {
  switch (action.type) {
    case PROCESS_NEW_BILL_REQUEST:
      return { loading: true };
    case PROCESS_NEW_BILL_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case PROCESS_NEW_BILL_FAIL:
      return { loading: false, error: action.payload };
    case PROCESS_NEW_BILL_RESET:
      return {};
    default:
      return state;
  }
};
