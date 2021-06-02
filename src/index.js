import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import store from "./store";
import { fetchAllZones } from "./actions/zone-action";
import { listProducts } from "./actions/products-action";
import { fetchAllUser } from "./actions/user-action";
import { fetchAllStands } from "./actions/stand-action";
import { fetchAllOrders } from "./actions/order";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const { orders } = store.getState().newOrder;
console.log(orders);
store.dispatch(fetchAllZones());
store.dispatch(listProducts());
store.dispatch(fetchAllUser());
store.dispatch(fetchAllStands());
store.dispatch(fetchAllOrders());

React.icons = icons;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
