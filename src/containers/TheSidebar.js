import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  return (
    <CSidebar
      style={{ backgroundColor: "transparent" }}
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand
        className="d-md-down-none"
        to="/"
        style={{ backgroundColor: "transparent" }}
      >
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={55}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={55}
        /> */}
        <img
          className="c-sidebar-brand-full"
          height="50"
          width="200"
          src="https://orjeen.com/wp-content/themes/orjeen/imgs/logo-en.png"
          alt=""
        />
        <img
          className="c-sidebar-brand-minimized"
          height="50"
          width="200"
          src="https://orjeen.com/wp-content/uploads/elago.jpg"
          alt=""
        />
      </CSidebarBrand>
      <CSidebarNav style={{ color: "black" }}>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
