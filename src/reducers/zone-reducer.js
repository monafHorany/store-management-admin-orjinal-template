import {
  FETCH_ALL_ZONES_REQUEST,
  FETCH_ALL_ZONES_SUCCESS,
  FETCH_ALL_ZONES_FAIL,
  FETCH_SINGLE_ZONE_REQUEST,
  FETCH_SINGLE_ZONE_SUCCESS,
  FETCH_SINGLE_ZONE_FAIL,
  ADD_NEW_ZONE_REQUEST,
  ADD_NEW_ZONE_SUCCESS,
  ADD_NEW_ZONE_FAIL,
  UPDATE_ZONE_REQUEST,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_FAIL,
  // DELETE_ZONE_REQUEST,
  // DELETE_ZONE_SUCCESS,
  // DELETE_ZONE_FAIL,
} from "../constants/zone-constants";

export const fetchAllZonesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_ZONES_REQUEST:
      return { loading: true };
    case FETCH_ALL_ZONES_SUCCESS:
      return { loading: false, zones: action.payload };
    case FETCH_ALL_ZONES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewZoneReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_ZONE_REQUEST:
      return { loading: true };
    case ADD_NEW_ZONE_SUCCESS:
      return { loading: false, success: true, zones: action.payload };
    case ADD_NEW_ZONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateZoneReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ZONE_REQUEST:
      return { loading: true };
    case UPDATE_ZONE_SUCCESS:
      return { loading: false, success: true, zones: action.payload };
    case UPDATE_ZONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchSingleZoneReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_ZONE_REQUEST:
      return { loading: true };
    case FETCH_SINGLE_ZONE_SUCCESS:
      return { loading: false, zone: action.payload };
    case FETCH_SINGLE_ZONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
