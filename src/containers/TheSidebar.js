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

// import CIcon from "@coreui/icons-react";

// sidebar nav config

const TheSidebar = () => {
  const zonesReducer = useSelector((state) => state.allZones);
  const { loading, zones } = zonesReducer;
  console.log(zones);
  let convertedZones = [];
  if (!loading && zones) {
    convertedZones = zones.map((zone) => ({
      _tag: "CSidebarNavItem",
      icon: "cil-location-pin",
      name: `Zone ${zone.zone_symbol}`,
      to: `/zone/${zone.id}`,
    }));
  }

  console.log(...convertedZones);

  const _nav = [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
      icon: "cil-speedometer",
    },
    {
      _tag: "CSidebarNavDivider",
      className: "m-2",
    },
    {
      _tag: "CSidebarNavTitle",
      _children: ["ZONES"],
    },
    ...convertedZones,
    {
      _tag: "CSidebarNavDivider",
      className: "m-3",
    },
    {
      _tag: "CSidebarNavTitle",
      _children: ["USER"],
    },

    {
      _tag: "CSidebarNavItem",
      icon: "cil-user",
      name: `all users`,
      to: "/users",
    },
    {
      _tag: "CSidebarNavItem",
      icon: "cil-user-plus",
      name: `add new user`,
      to: "/create-user",
    },
  ];
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  return (
    <>
      {!loading && zones && (
        <>
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
                height="64"
                width="220"
                src="https://orjeen.com/wp-content/themes/orjeen/imgs/logo-en.png"
                alt=""
              />
              <img
                className="c-sidebar-brand-minimized"
                height="64"
                width="220"
                src="https://orjeen.com/wp-content/uploads/elago.jpg"
                alt=""
              />
            </CSidebarBrand>
            <CSidebarNav style={{ color: "black" }}>
              <CCreateElement
                items={_nav}
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
        </>
      )}
    </>
  );
};

export default React.memo(TheSidebar);
