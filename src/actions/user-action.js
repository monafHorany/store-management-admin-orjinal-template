import axios from "axios";
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/user-constants";
export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post("/user/create", user, config);

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllUser());
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

  document.location.href = "/login";
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "user/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    sessionStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const fetchAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.get("/user", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const updateUser = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/user/${id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllUser());
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.delete(`/user/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllUser());
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
