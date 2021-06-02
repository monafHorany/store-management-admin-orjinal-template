import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styles from "./order.module.css";
import { css } from "@emotion/react";
import { fetchAllOrders } from "../actions/order";

import ScaleLoader from "react-spinners/ScaleLoader";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow,
} from "@coreui/react";
import { Table } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";

const Order = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const woo_orders = useSelector((state) => state.newOrder);
  const { loading: orderLoading, orders } = woo_orders;
  console.log(orderLoading);
  console.log(orders);
  const orderData =
    !orderLoading &&
    orders &&
    orders.map((order) => ({
      Order: order.woo_order_id + " " + order.order_owner_name,
      Date: new Date(order.order_created_date).toLocaleString(),
      status: order.order_status,
      Billing: order.billing_address,
      "Ship to": order.shipping_address,
      Total: order.total,
    }));
  const getBadge = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "cancelled":
        return "secondary";
      case "processing":
        return "warning";
      case "refunded":
        return "danger";
      default:
        return "primary";
    }
  };

  const columns = [
    {
      dataField: "Order",
      text: "Order",
    },
    {
      dataField: "Date",
      text: "Date",
    },
    {
      dataField: "status",
      text: "status",
    },
    {
      dataField: "Billing",
      text: "Billing",
    },
    {
      dataField: "Ship to",
      text: "Ship to",
    },
    {
      dataField: "Total",
      text: "Total",
    },
  ];
  useEffect(() => {
    !localStorage.getItem("orjeenOrderInfo") && dispatch(fetchAllOrders());
  }, [dispatch]);

  return !orderLoading && orderData ? (
    <CRow className="justify-content-center">
      <CCol xs="12" lg="10">
        <BootStrapTable
          keyField="order"
          data={orderData}
          columns={columns}
          pagination={paginationFactory()}
          headerClasses={styles.header_class}
        />
      </CCol>
      <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
          <CButton
            block
            color="success"
            size="lg"
            width="20"
            onClick={() => {
              dispatch(fetchAllOrders());
              localStorage.removeItem("orjeenOrderInfo");
            }}
          >
            Update Order List
          </CButton>
        </CCol>
      </CRow>
    </CRow>
  ) : (
    <CRow className="justify-content-center">
      <CCol
        xs="12"
        sm="10"
        md="8"
        lg="10"
        xl="5"
        xxl="4"
        style={{ textAlign: "center" }}
      >
        <div style={{ textAlign: "center" }} className="justify-content-center">
          <h3>Please Wait</h3>
        </div>
        <ScaleLoader
          color="#343a40"
          loading={orderLoading}
          size={150}
          height="150px"
          speedMultiplier="1"
          margin="25px"
          width="45px"
          radius="100px"
        />
      </CCol>
    </CRow>
  );
};

export default Order;
