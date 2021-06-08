import axios from "axios";
import {
  FETCH_ALL_BILLS_FAIL,
  FETCH_ALL_BILLS_REQUEST,
  FETCH_ALL_BILLS_SUCCESS,
  FETCH_ALL_ORDER_FAIL,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_SUCCESS,
  FETCH_ORDER_BY_ID_FAIL,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
  PROCESS_NEW_BILL_FAIL,
  PROCESS_NEW_BILL_REQUEST,
  PROCESS_NEW_BILL_SUCCESS,
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
    await axios.get(
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

    sessionStorage.setItem("orjeenOrderInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ORDER_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
export const fetchAllNewBills = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ALL_BILLS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "bills/fetchAllBills",
      config
    );

    dispatch({
      type: FETCH_ALL_BILLS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_BILLS_FAIL,
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

export const processNewBill = (orderItem) => async (dispatch) => {
  try {
    dispatch({
      type: PROCESS_NEW_BILL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "order/createBill",
      orderItem,
      config
    );

    dispatch({
      type: PROCESS_NEW_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROCESS_NEW_BILL_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
