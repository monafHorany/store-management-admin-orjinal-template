import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styles from "./order.module.css";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  CBadge,
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

  const orderData =
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

  return !orderLoading ? (
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
    </CRow>
  ) : (
    <CRow className="justify-content-center">
      <CCol md={10} lg={8} xl={8} xxl={8}>
        <div className="justify-content-center">
          <h3>Please Wait</h3>
        </div>
        <ScaleLoader
          color="#343a40"
          loading={orderLoading}
          size={150}
          height="90"
          speedMultiplier="1"
          margin="25"
          width="90"
          radius="100"
        />
      </CCol>
    </CRow>
  );
};

export default Order;
