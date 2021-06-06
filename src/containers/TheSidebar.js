import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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

const TheSidebar = () => {
  const zonesReducer = useSelector((state) => state.allZones);
  const { loading, zones } = zonesReducer;

  var convertedZones = [];
  if (!loading && zones.length !== 0) {
    convertedZones = zones.map((zone) => ({
      _tag: "CSidebarNavItem",
      icon: "cil-location-pin",
      name: `Zone ${zone.zone_symbol}`,
      to: `/zone/${zone.id}`,
    }));
  } else {
    convertedZones = [
      {
        _tag: "CSidebarNavTitle",
        _children: ["NO ZONES YET"],
        className: "m-2",
      },
    ];
  }
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const woo_orders = useSelector((state) => state.newOrder);
  const { orders } = woo_orders;
  if (!userInfo) {
    history.push("/login");
  }
  // useEffect(() => {}, [history, userInfo]);

  const userLinks =
    userInfo && userInfo.role === "super user"
      ? [
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
        ]
      : [];

  const _nav = [
    {
      _tag: "CSidebarNavItem",
      name: "Products",
      to: "/Products",
      icon: "cib-product-hunt",
    },
    // {
    //   _tag: "CSidebarNavDivider",
    //   className: "m-2",
    // },
    {
      _tag: "CSidebarNavTitle",
      _children: ["ZONES"],
    },
    ...convertedZones,
    {
      _tag: "CSidebarNavItem",
      name: "order",
      to: "/order",
      icon: "cil-cart",
      badge: orders && {
        color: "danger",
        text: orders.length,
      },
    },
    // {
    //   _tag: "CSidebarNavDivider",
    //   className: "m-3",
    // },

    ...userLinks,
    // {
    //   _tag: "CSidebarNavDivider",
    //   className: "m-3",
    // },
    {
      _tag: "CSidebarNavItem",
      name: "Product Report",
      to: "/p-report",
      // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
      icon: "cil-print",
    },
    {
      _tag: "CSidebarNavDivider",
      className: "m-3",
    },
    {
      _tag: "CSidebarNavItem",
      name: "logout",
      to: "/logout",
      // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
      icon: "cil-account-logout",
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
