import axios from "axios";
import {
  LOCATION_CREATE_FAIL,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_DELETE_FAIL,
  LOCATION_DELETE_REQUEST,
  LOCATION_DELETE_SUCCESS,
} from "../constants/location-constants";

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
      process.env.REACT_APP_BACKEND_URL + "product/insertProduct",
      location
      // config
    );

    dispatch({
      type: LOCATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_CREATE_FAIL,
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
      `${process.env.REACT_APP_BACKEND_URL}product/delete/${id}`
    );

    dispatch({
      type: LOCATION_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_DELETE_FAIL,
      payload: error.response,
    });
  }
};
