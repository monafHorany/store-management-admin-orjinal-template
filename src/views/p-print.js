import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../actions/user-action";

const PPrint = ({ history }) => {
  const clickToPrint = () => {
    window.location = `http://192.168.1.16:5000/product/printReport`;
  };

  useEffect(() => {
    clickToPrint();
    history.push("/");
  }, [history]);

  return <></>;
};

export default PPrint;
