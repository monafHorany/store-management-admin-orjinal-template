import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const { orders } = woo_orders;

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
  // const pages = (orderData) => {
  //   switch (orderData.length) {
  //     case "completed":
  //       return "success";
  //     case "cancelled":
  //       return "secondary";
  //     case "processing":
  //       return "warning";
  //     case "refunded":
  //       return "danger";
  //     default:
  //       return "primary";
  //   }
  // };
  const history = useHistory();
  const fields = ["Order", "Date", "status", "Billing", "Ship to", "Total"];

  const [currentPage, setCurrentPage] = useState(2);

  return (
    <CRow className="justify-content-center">
      <CCol xs="12" lg="6">
        <CCard>
          <CCardBody>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  {fields.map((field) => (
                    <th>{field}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderData &&
                  orderData.map((order) => (
                    <tr>
                      <td>{order.Order}</td>
                      <td>{order.Date}</td>
                      <td>
                        <CBadge color={getBadge(order.status)}>
                          {order.status}
                        </CBadge>
                      </td>
                      <td>{order.Billing}</td>
                      <td>{order["Ship to"]}</td>
                      <td>{order.Total}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <CPagination
              activePage={currentPage}
              pages={orderData && orderData.length / 10}
              onActivePageChange={setCurrentPage}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Order;
