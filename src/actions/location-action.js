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

export const locateProduct = (location) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOCATION_CREATE_REQUEST,
    });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // // const config = {
    // //   headers: {
    // //     "content-type": "multipart/form-data",
    // //     Authorization: `Bearer ${userInfo.token}`,
    // //   },
    // // };
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "location/insertProduct",
      location
      // config
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
  }
};
export const editLocation = (id, location) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_LOCATION_REQUEST,
    });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // // const config = {
    // //   headers: {
    // //     "content-type": "multipart/form-data",
    // //     Authorization: `Bearer ${userInfo.token}`,
    // //   },
    // // };
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `location/edit/${id}`,
      location
      // config
    );

    dispatch({
      type: EDIT_LOCATION_SUCCESS,
      payload: data,
    });
    dispatch(listProducts());
  } catch (error) {
    dispatch({
      type: EDIT_LOCATION_FAIL,
      payload: error.response,
    });
  }
};

export const deleteProductLocation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOCATION_DELETE_REQUEST,
    });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}location/delete/${id}`
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
  }
};
