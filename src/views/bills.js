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

const Bills = () => {
  const [alert, setAlert] = useState(false);
  const [bill_Id, setBillId] = useState();
  const history = useHistory();

  const { SearchBar } = Search;

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const allBills = useSelector((state) => state.AllBills);
  const { loading: billsLoading, bills } = allBills;
  const removedBill = useSelector((state) => state.removeBill);
  const { loading: removeLoading, success } = removedBill;

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
              console.log(row);
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
  }, [success]);

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
    </Fragment>
  );
};

export default Bills;
