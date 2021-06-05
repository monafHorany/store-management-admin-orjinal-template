import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const order = React.lazy(() => import("./views/order"));
const order_detail = React.lazy(() => import("./views/order_detail"));
const products = React.lazy(() => import("./views/products"));

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const zone_page = React.lazy(() => import("./views/zone-detail"));
const stand_page = React.lazy(() => import("./views/stand-detail"));
const login = React.lazy(() => import("./views/login"));
const create = React.lazy(() => import("./views/create-user"));
const Logout = React.lazy(() => import("./views/logout"));
const PPrint = React.lazy(() => import("./views/p-print"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/order", exact: true, name: "order", component: order },
  {
    path: "/order_detail/:id",
    exact: true,
    name: "order",
    component: order_detail,
  },
  { path: "/logout", exact: true, name: "logout", component: Logout },
  { path: "/products", exact: true, name: "logout", component: products },
  { path: "/p-report", exact: true, name: "p-report", component: PPrint },
  { path: "/zone/:id", exact: true, name: "zone", component: zone_page },
  { path: "/stand/:id", exact: true, name: "stand", component: stand_page },
  { path: "/login", exact: true, name: "login", component: login },
  { path: "/create-user", exact: true, name: "create", component: create },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
];

export default routes;
