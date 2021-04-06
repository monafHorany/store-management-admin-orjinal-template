import {
  FETCH_ALL_STAND_REQUEST,
  FETCH_ALL_STAND_SUCCESS,
  FETCH_ALL_STAND_FAIL,
  FETCH_SINGLE_STAND_REQUEST,
  FETCH_SINGLE_STAND_SUCCESS,
  FETCH_SINGLE_STAND_FAIL,
  ADD_NEW_STAND_REQUEST,
  ADD_NEW_STAND_SUCCESS,
  ADD_NEW_STAND_FAIL,
  UPDATE_STAND_REQUEST,
  UPDATE_STAND_SUCCESS,
  UPDATE_STAND_FAIL,
  DELETE_STAND_REQUEST,
  DELETE_STAND_SUCCESS,
  DELETE_STAND_FAIL,
} from "../constants/stand-constants";

export const fetchAllStandsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_STAND_REQUEST:
      return { loading: true };
    case FETCH_ALL_STAND_SUCCESS:
      return { loading: false, stands: action.payload };
    case FETCH_ALL_STAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewStandReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_STAND_REQUEST:
      return { loading: true };
    case ADD_NEW_STAND_SUCCESS:
      return { loading: false, success: true };
    case ADD_NEW_STAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateStandReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STAND_REQUEST:
      return { loading: true };
    case UPDATE_STAND_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_STAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchSingleStandReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_STAND_REQUEST:
      return { loading: true };
    case FETCH_SINGLE_STAND_SUCCESS:
      return { loading: false, stand: action.payload };
    case FETCH_SINGLE_STAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteStandReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DELETE_STAND_REQUEST:
      return { loading: true };
    case DELETE_STAND_SUCCESS:
      return { loading: false, success: true };
    case DELETE_STAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
