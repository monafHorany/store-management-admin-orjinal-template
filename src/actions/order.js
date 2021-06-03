import axios from "axios";
import {
  FETCH_ALL_ORDER_FAIL,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_SUCCESS,
  FETCH_ORDER_BY_ID_FAIL,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
} from "../constants/order-constants";

export const fetchAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ALL_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const WooOrder = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "order/fetchAllOrderFromWoocommerce",
      config
    );

    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "order/fetchAllNewOrder",
      config
    );

    dispatch({
      type: FETCH_ALL_ORDER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("orjeenOrderInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ORDER_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const fetchOrderDetailById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ORDER_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `order/order/${id}`,
      config
    );

    dispatch({
      type: FETCH_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_BY_ID_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
