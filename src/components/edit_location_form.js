import React, { useState, useEffect } from "react";
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
  CSelect,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { editLocationQuantity } from "../actions/location-action";
import { fetchSingleStand } from "../actions/stand-action";

export const EditLocationForm = ({ modalShow, modalClose, productDetail }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");

  const zonesReducer = useSelector((state) => state.allZones);
  const { zones } = zonesReducer;

  const location = useSelector((state) => state.editLocation);
  const { loading, success } = location;

  const standReducer = useSelector((state) => state.sigleStand);
  const { loading: standLoading, stand } = standReducer;

  let availableQuantity;
  if (stand) {
    availableQuantity = stand.products.filter(
      (product) => product.id === productDetail.id
    )[0].location.quantity;
  }
  useEffect(() => {
    if (productDetail) {
      dispatch(fetchSingleStand(productDetail.location.standId));
    }
  }, [dispatch, productDetail, success]);

  const formSubmit = () => {
    if (
      !quantity ||
      quantity >
        availableQuantity +
          stand.stand_capacity -
          stand.products.reduce((acc, item) => acc + item.location.quantity, 0)
    ) {
      alert("Please check inserted values");
      return;
    }
    dispatch(editLocationQuantity(productDetail.location.id, { quantity }));
  };

  return (
    !standLoading && (
      <CModal show={modalShow} onClose={modalClose} color="warning">
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
                Edit Quantity
              </CCardHeader>
              <CCardBody>
                <div style={{ textAlignLast: "center" }}>
                  <p>
                    {availableQuantity}{" "}
                    {availableQuantity > 1 ? "pieces" : "piece"} of this product
                    exist in this stand
                  </p>
                  <p>
                    {stand.stand_capacity -
                      stand.products.reduce(
                        (acc, item) => acc + item.location.quantity,
                        0
                      )}{" "}
                    empty place available in this stand
                  </p>
                </div>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
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
                        placeholder={`new quantity must be between 0 ~ ${
                          availableQuantity +
                          stand.stand_capacity -
                          stand.products.reduce(
                            (acc, item) => acc + item.location.quantity,
                            0
                          )
                        }`}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter style={{ textAlign: "center" }}>
                <CButton
                  style={{
                    borderColor: "#ee8332",
                    color: "#ee8332",
                    cursor: !quantity && "not-allowed",
                  }}
                  onClick={formSubmit}
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={
                    !quantity ||
                    quantity >
                      availableQuantity +
                        stand.stand_capacity -
                        stand.products.reduce(
                          (acc, item) => acc + item.location.quantity,
                          0
                        )
                  }
                >
                  edit
                  <i className="fas fa-plus" style={{ marginLeft: "1em" }}></i>
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CModal>
    )
  );
};
