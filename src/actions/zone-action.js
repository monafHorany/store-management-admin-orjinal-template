import axios from "axios";

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
  DELETE_ZONE_REQUEST,
  DELETE_ZONE_SUCCESS,
  DELETE_ZONE_FAIL,
} from "../constants/zone-constants";

export const fetchAllZones = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ALL_ZONES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/zone", config);

    dispatch({
      type: FETCH_ALL_ZONES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ZONES_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};


export const fetchSingleZones = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_SINGLE_ZONE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/zone/${id}`, config);

    dispatch({
      type:   FETCH_SINGLE_ZONE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_ZONE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};