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
import { locateProduct } from "../actions/location-action";
import { LOCATION_CREATE_RESET } from "../constants/location-constants";

export const LocationForm = ({ modalShow, modalClose, productDetail }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [zoneId, setZoneId] = useState();
  const [standId, setStandId] = useState();

  const productId = productDetail.id;

  const zonesReducer = useSelector((state) => state.allZones);
  const { zones } = zonesReducer;

  const location = useSelector((state) => state.addLocation);
  const { loading, success } = location;

  useEffect(() => {
    if (success) {
      dispatch({ type: LOCATION_CREATE_RESET });
      window.location.reload();
    }
  }, [dispatch, success]);

  // const [zone, setZone] = useState();

  const formSubmit = () => {
    if (!quantity || !zoneId || !standId || !productId || quantity <= 0) {
      alert("Please fill all fields");
      return;
    }
    dispatch(locateProduct({ quantity, zoneId, standId, productId }));
  };

  return (
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
              Assign To Location
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

                {zones && (
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
                        onChange={(e) => {
                          setZoneId(e.target.value);
                        }}
                      >
                        <option></option>
                        {zones.map((zone, index) => (
                          <option key={index} value={zone.id}>
                            Zone {zone.zone_label}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}
                {zoneId && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">select Stand</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        dir="ltr"
                        custom
                        size="sm"
                        name="selectSm"
                        id="SelectLm"
                        onChange={(e) => {
                          setStandId(e.target.value);
                        }}
                      >
                        <option></option>
                        {zones
                          .filter((zone) => +zone.id === +zoneId)[0]
                          .stands.map((stand, index) => (
                            <option
                              key={index}
                              value={stand.id}
                              style={{
                                color:
                                  +stand.stand_capacity -
                                    stand.products.reduce(
                                      (acc, item) =>
                                        acc + item.location.quantity,
                                      0
                                    ) ===
                                    0 && "red",
                              }}
                              disabled={
                                +stand.stand_capacity -
                                  stand.products.reduce(
                                    (acc, item) => acc + item.location.quantity,
                                    0
                                  ) ===
                                  0 ||
                                quantity >
                                  +stand.stand_capacity -
                                    stand.products.reduce(
                                      (acc, item) =>
                                        acc + item.location.quantity,
                                      0
                                    )
                              }
                            >
                              {stand.stand_label} available places{" "}
                              {+stand.stand_capacity -
                                stand.products.reduce(
                                  (acc, item) => acc + item.location.quantity,
                                  0
                                )}
                              {+stand.stand_capacity -
                                stand.products.reduce(
                                  (acc, item) => acc + item.location.quantity,
                                  0
                                ) ===
                                0 && " full"}
                            </option>
                          ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}
              </CForm>
            </CCardBody>
            <CCardFooter style={{ textAlign: "center" }}>
              <CButton
                style={{
                  borderColor: "#ee8332",
                  color: "#ee8332",
                  cursor: (!quantity || !zoneId || !standId) && "not-allowed",
                }}
                onClick={formSubmit}
                type="button"
                variant="outline"
                size="lg"
                disabled={!quantity || !zoneId || !standId || loading}
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
