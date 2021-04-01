import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  // PRODUCT_LIST_FAIL,
} from "../constants/product-constants";

import axios from "axios";
import { fetchAllZones } from "./zone-action";
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/product/create", product, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(listProducts());
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch(fetchAllZones());
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const UpdateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/product/update/${id}`, product, config);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/product/delete/${id}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });

    dispatch(listProducts());
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/product");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
    // sessionStorage.setItem(
    //   "products",

    //   JSON.stringify(data)
    // );
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
