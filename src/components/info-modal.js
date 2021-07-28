import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductLocation } from "../actions/location-action";
import { LOCATION_DELETE_RESET } from "../constants/location-constants";
import { EditLocationForm } from "./edit_location_form";
import { LocationForm } from "./location-form";

export function InfoModal({ modalShow, modalClose, productDetail, match }) {
  const dispatch = useDispatch();
  const deleteLocation = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProductLocation(id));
    }
  };
  // const id = match.params.id;
  const [locationForm, setLocationForm] = useState(false);
  const [editLocationForm, setEditLocationForm] = useState(false);
  const LocationDeletion = useSelector((state) => state.removeLocation);
  const { success, error } = LocationDeletion;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = useSelector((state) => state.editLocation);
  const { success: editingSuccess } = location;
  useEffect(() => {
    if (success && !error) {
      modalClose();
      dispatch({ type: LOCATION_DELETE_RESET });
      window.location.reload();
    }
    if (editingSuccess) {
      setEditLocationForm(false);
      window.location.reload();
    }
  }, [dispatch, editingSuccess, error, modalClose, success]);
  return (
    <React.Fragment>
      <CModal show={modalShow} onClose={modalClose} color="info" size="lg">
        <CModalHeader>
          <CModalTitle>{productDetail.product_en_name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <div>
                <strong>name: </strong> {productDetail.product_en_name}
              </div>{" "}
              <br />
              <strong>description: </strong>{" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetail.product_en_desc,
                }}
              ></div>{" "}
              <br />
              <div>
                <strong>product_sku: </strong>
                {productDetail.product_sku}
              </div>{" "}
              <br />
              <div>
                <strong>product BarCode: </strong>
                {productDetail.product_barcode}
              </div>{" "}
              <br />
              <div>
                <strong>model_number: </strong> {productDetail.model_number}
              </div>{" "}
              <br />
              {productDetail.stands ? (
                productDetail.stands.length !== 0 ? (
                  <div>
                    <strong>Located At:</strong>
                    <ul>
                      {productDetail.stands.map((stand) => (
                        <li key={stand.id} style={{ position: "relative" }}>
                          {stand.location.quantity} pieces in{" "}
                          <strong>Zone</strong> {stand.location.zone_label}{" "}
                          <strong>stand Number</strong> # {stand.stand_label}{" "}
                          {userInfo && userInfo.role === "super user" && (
                            <i
                              style={{
                                marginLeft: "24px",
                                color: "#FF0000",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteLocation(stand.location.id);
                              }}
                              className="fas fa-trash-alt"
                            ></i>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div style={{ color: "#920110" }}>
                    Not added to any zone yet.
                    <CButton
                      style={{ marginLeft: "1em" }}
                      color="success"
                      onClick={() => setLocationForm(!locationForm)}
                    >
                      add now
                    </CButton>
                  </div>
                )
              ) : productDetail.location ? (
                userInfo &&
                userInfo.role === "super user" && (
                  <div style={{ display: "flex" }}>
                    <CButton
                      color="primary"
                      className="mx-2"
                      onClick={() => {
                        setEditLocationForm(true);
                      }}
                    >
                      Edit quantity{" "}
                      <i
                        style={{
                          color: "#FFFFFF",
                          cursor: "pointer",
                        }}
                        className="fas fa-edit"
                      ></i>
                    </CButton>
                    <CButton
                      color="primary"
                      className="mx-2"
                      onClick={() => {
                        deleteLocation(productDetail.location.id);
                      }}
                    >
                      Remove
                      <i
                        style={{
                          marginLeft: "8px",
                          color: "#FFFFFF",
                          cursor: "pointer",
                        }}
                        className="fas fa-trash-alt"
                      ></i>
                    </CButton>
                  </div>
                )
              ) : (
                <div style={{ color: "#920110" }}>
                  Not added to any zone yet.{" "}
                  <CButton
                    onClick={() => setLocationForm(!locationForm)}
                    style={{ marginLeft: "1em" }}
                  >
                    add now
                  </CButton>
                  {/* <CButton onClick={() => window.print()}>
                  add now
                  </CButton> */}
                </div>
              )}
            </CCol>
            <CCol>
              <Image
                height={300}
                width={300}
                src={productDetail.image_url}
                alt=""
                fluid
              />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <LocationForm
        modalShow={locationForm}
        modalClose={() => setLocationForm(false)}
        productDetail={productDetail}
      />
      {productDetail.location && (
        <EditLocationForm
          modalShow={editLocationForm}
          modalClose={() => setEditLocationForm(false)}
          productDetail={productDetail}
        />
      )}
    </React.Fragment>
  );
}
