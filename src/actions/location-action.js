import axios from "axios";
import {
  EDIT_LOCATION_FAIL,
  EDIT_LOCATION_REQUEST,
  EDIT_LOCATION_SUCCESS,
  LOCATION_CREATE_FAIL,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_DELETE_FAIL,
  LOCATION_DELETE_REQUEST,
  LOCATION_DELETE_SUCCESS,
} from "../constants/location-constants";
import { listProducts } from "./products-action";
import { logout } from "./user-action";

export const locateProduct = (location) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOCATION_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "location/insertProduct",
      location,
      config
    );

    dispatch({
      type: LOCATION_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(listProducts());
  } catch (error) {
    dispatch({
      type: LOCATION_CREATE_FAIL,
      payload: error.response,
    });
    dispatch(logout());
  }
};
export const editLocationQuantity =
  (id, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_LOCATION_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `location/edit/${id}`,
        quantity,
        config
      );

      dispatch({
        type: EDIT_LOCATION_SUCCESS,
        payload: data,
      });
      // dispatch(listProducts());
    } catch (error) {
      dispatch({
        type: EDIT_LOCATION_FAIL,
        payload: error.response,
      });
      dispatch(logout());
    }
  };

export const deleteProductLocation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOCATION_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}location/delete/${id}`,
      config
    );

    dispatch({
      type: LOCATION_DELETE_SUCCESS,
      payload: data,
    });
    dispatch(listProducts());
  } catch (error) {
    dispatch({
      type: LOCATION_DELETE_FAIL,
      payload: error.response,
    });
    dispatch(logout());
  }
};
