import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../actions/user-action";

const PPrint = ({ history }) => {
  const clickToPrint = () => {
    window.location = `${process.env.REACT_APP_BACKEND_URL}product/printReport`;
  };

  useEffect(() => {
    clickToPrint();
    history.push("/");
  }, [history]);

  return <></>;
};

export default PPrint;
