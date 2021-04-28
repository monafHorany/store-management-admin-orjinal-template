import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_LIST_BY_STAND_ID_REQUEST,
  PRODUCT_LIST_BY_STAND_ID_SUCCESS,
  PRODUCT_LIST_BY_STAND_ID_FAIL,
  PRODUCT_LIST_BY_STAND_ID_RESET,
} from "../constants/product-constants";

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const productListByStandIdReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_STAND_ID_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_BY_STAND_ID_SUCCESS:
      return {
        loading: false,
        standProducts: action.payload,
      };
    case PRODUCT_LIST_BY_STAND_ID_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_BY_STAND_ID_RESET:
      return {};
    default:
      return state;
  }
};
