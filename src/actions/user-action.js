import axios from "axios";
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
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
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.response.data || error.response.statusText,
    });
  }
};
