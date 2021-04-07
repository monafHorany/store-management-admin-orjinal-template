import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/user-action";

const Logout = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.confirm("Are You Sure")) {
      dispatch(logout());
    } else {
      history.push("/dashboard");
    }
  }, [dispatch, history]);

  return <></>;
};

export default Logout;
