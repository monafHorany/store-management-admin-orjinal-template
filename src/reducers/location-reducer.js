import {
  EDIT_LOCATION_FAIL,
  EDIT_LOCATION_REQUEST,
  EDIT_LOCATION_RESET,
  EDIT_LOCATION_SUCCESS,
  LOCATION_CREATE_FAIL,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_RESET,
  LOCATION_CREATE_SUCCESS,
  LOCATION_DELETE_FAIL,
  LOCATION_DELETE_REQUEST,
  LOCATION_DELETE_RESET,
  LOCATION_DELETE_SUCCESS,
} from "../constants/location-constants";

export const productLocationCreateReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case LOCATION_CREATE_REQUEST:
      return { loading: true };
    case LOCATION_CREATE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case LOCATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LOCATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productLocationEditReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case EDIT_LOCATION_REQUEST:
      return { loading: true };
    case EDIT_LOCATION_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case EDIT_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const productLocationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOCATION_DELETE_REQUEST:
      return { loading: true };
    case LOCATION_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case LOCATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case LOCATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
