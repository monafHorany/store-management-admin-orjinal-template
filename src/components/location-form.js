import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CRow,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";

export const LocationForm = ({ modalShow, modalClose, productDetail }) => {
  const dispatch = useDispatch();

  const zonesReducer = useSelector((state) => state.allZones);
  const { loading, zones } = zonesReducer;

  console.log(zones);

  const [quantity, setQuantity] = useState();
  const [zoneId, setZoneId] = useState();
  const [standId, setStandId] = useState();
  const [productId, setProductId] = useState();
  return (
    <CModal show={modalShow} onClose={modalClose} color="warning" size="md">
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader
              style={{
                textAlign: "center",
                backgroundColor: "#ee8332",
                color: "#FFFFFF",
                fontWeight: "bold",
                letterSpacing: ".5em",
              }}
            >
              Add Product
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      type="number"
                      value={quantity}
                      placeholder="Quantity"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">product barcode</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      required
                      // onChange={(e) => setProduct_barcode(e.target.value)}
                      type="number"
                      // value={_barcode}
                      placeholder="product barcode"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">SKU Code</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      required
                      // onChange={(e) => setProduct_sku(e.target.value)}
                      type="text"
                      // value={_sku}
                      placeholder="SKU Code"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Model Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      required
                      // onChange={(e) => setModel_number(e.target.value)}
                      type="text"
                      // value={productModel_number}
                      placeholder="Model Number"
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter style={{ textAlign: "center" }}>
              <CButton
                style={{ borderColor: "#ee8332", color: "#ee8332" }}
                //   onClick={formSubmit}
                type="button"
                variant="outline"
                size="lg"
              >
                Add
                <i className="fas fa-plus" style={{ marginLeft: "1em" }}></i>
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CModal>
  );
};
