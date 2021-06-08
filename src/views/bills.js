import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import styles from "./order.module.css";
import { fetchAllOrders } from "../actions/order";

import ScaleLoader from "react-spinners/ScaleLoader";
import { CButton, CCol, CRow } from "@coreui/react";
import { AlertModal } from "../components/alert-modal";

const Bills = () => {
  const [alert, setAlert] = useState(false);
  const [warning, setWarning] = useState(false);
  const history = useHistory();

  const { SearchBar } = Search;

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const allBills = useSelector((state) => state.AllBills);
  const { loading: billsLoading, bills } = allBills;
  console.log(bills);
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      if (row.status === "processing" || row.status !== "confirmed") {
      }
      history.push(`/order_detail/${row.id}`);
    },
  };

  return (
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
          <ToolkitProvider
            keyField="id"
            // data={}
            // columns={}
            search
          >
            {(props) => (
              <React.Fragment>
                <SearchBar {...props.searchProps} />
                <BootStrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  headerClasses={styles.header_class}
                  rowEvents={rowEvents}
                />
              </React.Fragment>
            )}
          </ToolkitProvider>
          {/* <BootStrapTable
            keyField="id"
            data={orderData}
            columns={columns}
            pagination={paginationFactory()}
            headerClasses={styles.header_class}
            rowEvents={rowEvents}
          /> */}
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
  );
};

export default Bills;
