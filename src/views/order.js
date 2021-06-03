import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styles from "./order.module.css";
import { fetchAllOrders } from "../actions/order";

import ScaleLoader from "react-spinners/ScaleLoader";
import { CButton, CCol, CRow } from "@coreui/react";
import { AlertModal } from "../components/alert-modal";

const Order = () => {
  const [alert, setAlert] = useState(false);
  const [warning, setWarning] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const woo_orders = useSelector((state) => state.newOrder);
  const { loading: orderLoading, orders } = woo_orders;
  const orderData =
    !orderLoading &&
    orders &&
    orders.map((order) => ({
      id: order.woo_order_id,
      OrderName: order.order_owner_name,
      Date: new Date(order.order_created_date).toLocaleString(),
      status: order.order_status,
      Billing: order.billing_address,
      "Ship to": order.shipping_address,
      Total: order.total,
    }));
  const columns = [
    {
      dataField: "id",
      text: "id",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "OrderName",
      text: "OrderName",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Date",
      text: "Date",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "status",
      text: "status",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Billing",
      text: "Billing",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Ship to",
      text: "Ship to",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Total",
      text: "Total",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
  ];
  useEffect(() => {
    !localStorage.getItem("orjeenOrderInfo") && dispatch(fetchAllOrders());
  }, [dispatch]);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(row);
      if (row.status === "processing" || row.status !== "confirmed") {
        // setAlert(true);
      }
      // else {
      history.push(`/order_detail/${row.id}`);
      // }
    },
    // onMouseEnter: (e, row, rowIndex) => {
    //   console.log(`enter on row with index: ${rowIndex}`);
    // },
  };

  return !orderLoading && orderData ? (
    <>
      {" "}
      <AlertModal modalShow={alert} modalClose={() => setAlert(false)}>
        This Order hasn't been Confirmed yet, Please try again Later.
      </AlertModal>
      <AlertModal
        modalShow={warning}
        modalClose={() => setWarning(false)}
        bottunFooter
        confirmation={() => {
          dispatch(fetchAllOrders());
          localStorage.removeItem("orjeenOrderInfo");
          setWarning(false);
        }}
        cancelation={() => setWarning(false)}
      >
        This Process might take approximately 2~3 minutes.
      </AlertModal>
      <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
          <BootStrapTable
            keyField="id"
            data={orderData}
            columns={columns}
            pagination={paginationFactory()}
            headerClasses={styles.header_class}
            rowEvents={rowEvents}
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
                setWarning(true);
              }}
            >
              Update Order List
            </CButton>
          </CCol>
        </CRow>
      </CRow>
    </>
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
