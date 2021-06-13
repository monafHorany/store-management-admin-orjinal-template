import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import styles from "./order.module.css";
import { fetchAllOrders, removeBill } from "../actions/order";

import ScaleLoader from "react-spinners/ScaleLoader";
import { CButton, CCol, CRow } from "@coreui/react";
import { AlertModal } from "../components/alert-modal";
import { Fragment } from "react";
import { BillInfoModal } from "../components/bill-info";
import { REMOVE_BILL_RESET } from "../constants/order-constants";

const Bills = () => {
  const [alert, setAlert] = useState(false);
  const [bill_Id, setBillId] = useState();
  const [info, setInfo] = useState(false);

  const history = useHistory();

  const { SearchBar } = Search;

  const dispatch = useDispatch();

  const allBills = useSelector((state) => state.AllBills);
  const { bills } = allBills;
  const removedBill = useSelector((state) => state.removeBill);
  const { loading: removeLoading, success, error } = removedBill;

  const columns = [
    {
      dataField: "woo_order_id",
      text: "Order_id",
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
      dataField: "order_owner",
      text: "Ordered By",
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
      dataField: "order_total",
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
    {
      dataField: "createdAt",
      text: "Bill Created At",
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
      dataField: "df1",
      isDummyField: true,
      text: "Action 1",
      formatter: (cellContent, row) => {
        return (
          <CButton
            block
            disabled={removeLoading}
            color="danger"
            onClick={() => {
              setAlert(true);
              setBillId(row.id);
            }}
          >
            Delete
            <i className="fas fa-trash-alt pl-4"></i>
          </CButton>
        );
      },
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <div style={{ color: "#FFFFFF" }}>
        {bills.map((bill, index) => {
          return (
            bill.id === row.id && (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: bill.note,
                }}
              ></div>
            )
          );
        })}
      </div>
    ),
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
    if (error) {
      setInfo(true);
    }
  }, [error, success]);

  return (
    <Fragment>
      <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
          <ToolkitProvider keyField="id" data={bills} columns={columns} search>
            {(props) => (
              <React.Fragment>
                <SearchBar {...props.searchProps} />
                <BootStrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  headerClasses={styles.header_class}
                  expandRow={expandRow}
                />
              </React.Fragment>
            )}
          </ToolkitProvider>
        </CCol>
      </CRow>
      <AlertModal
        size="sm"
        bottunFooter
        modalShow={alert}
        modalClose={() => setAlert(false)}
        confirmation={() => dispatch(removeBill(bill_Id))}
      >
        Are you sure?
      </AlertModal>

      <BillInfoModal
        modalShow={info}
        color={success ? "success" : error ? "danger" : "primary"}
        header={success ? "New bill Created" : "Some thing went wrong"}
        bottunFooter
        ok={() => {
          setInfo(false);
          dispatch({ type: REMOVE_BILL_RESET });
          success
            ? document.location.replace("/order")
            : window.location.reload();
        }}
        bodyText={
          error ? (
            error
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: error,
              }}
            ></div>
          )
        }
      />
    </Fragment>
  );
};

export default Bills;
