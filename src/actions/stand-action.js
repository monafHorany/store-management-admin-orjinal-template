import axios from "axios";

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
import { fetchAllZones } from "./zone-action";

export const fetchAllStands = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ALL_STAND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/stand",
      config
    );

    dispatch({
      type: FETCH_ALL_STAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_STAND_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const fetchSingleStand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_SINGLE_STAND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/stand/${id}`,
      config
    );

    dispatch({
      type: FETCH_SINGLE_STAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_STAND_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const addNewStand = (id, stand) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NEW_STAND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/stand/${id}/create`,
      stand,
      config
    );

    dispatch({
      type: ADD_NEW_STAND_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllZones());
  } catch (error) {
    dispatch({
      type: ADD_NEW_STAND_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const updateStand = (id, stand) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_STAND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/stand/update/${id}`,
      stand,
      config
    );

    dispatch({
      type: UPDATE_STAND_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllStands());
  } catch (error) {
    dispatch({
      type: UPDATE_STAND_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const deleteStand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_STAND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/stand/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_STAND_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllStands());
  } catch (error) {
    dispatch({
      type: DELETE_STAND_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
