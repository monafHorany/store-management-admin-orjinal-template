import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import styles from "./order.module.css";
import { fetchOrderDetailById, processNewBill } from "../actions/order";

const OrderDetail = ({ match }) => {
  const dispatch = useDispatch();
  const orderReducer = useSelector((state) => state.singleOrder);
  const { loading, order } = orderReducer;
  const [showBillForm, setShowBillForm] = useState(false);

  const id = match.params.id;

  useEffect(() => {
    dispatch(fetchOrderDetailById(id));
  }, [dispatch, id]);

  const columns = [
    {
      dataField: "itemName",
      text: "Product Name",
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
      dataField: "Quantity",
      text: "Quantity",
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
      dataField: "SKU",
      text: "SKU",
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
      text: "Product Price",
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

  const orderData =
    !loading &&
    order &&
    order.order_items.map((item) => ({
      itemName: item.item_name,
      Quantity: item.item_quantity,
      SKU: item.item_sku,
      Total: item.total,
    }));
  return order ? (
    <React.Fragment>
      <div>
        <ul>
          <li>{order.order_owner_name}</li>
          <li>{order.order_owner_phone_number}</li>
          <li>{order.order_owner_email}</li>
          <li>{order.currency}</li>
          <li>{order.total}</li>
        </ul>
        <BootStrapTable
          keyField="itemName"
          data={orderData}
          columns={columns}
          headerClasses={styles.header_class}
        />
        <div style={{ textAlignLast: "center" }}>
          <CButton
            color="success"
            size="lg"
            onClick={() => dispatch(processNewBill(order.order_items))}
          >
            Pull This Order
          </CButton>
        </div>
      </div>
      <CModal
        show={showBillForm}
        onClose={() => setShowBillForm(false)}
        color="success"
      >
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader
                style={{
                  textAlign: "center",
                  backgroundColor: "#416442",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  letterSpacing: ".6em",
                }}
              >
                OREDR COMPLETION{" "}
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  {/* {!loading && order && order.order_items.map(item=> (

                  ))} */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Quantity</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput required type="number" placeholder="Quantity" />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">select Zone</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        dir="ltr"
                        custom
                        size="sm"
                        name="selectSm"
                        id="SelectLm"
                      >
                        <option></option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">select Stand</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom size="sm" name="selectSm" id="SelectLm">
                        <option></option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CButton color="success" size="sm">
                OK
              </CButton>
            </CCard>
          </CCol>
        </CRow>
      </CModal>
    </React.Fragment>
  ) : (
    <div>loading</div>
  );
};

export default OrderDetail;
