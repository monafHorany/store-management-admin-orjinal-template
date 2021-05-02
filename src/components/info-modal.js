import {
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductLocation } from "../actions/location-action";
import { LOCATION_DELETE_RESET } from "../constants/location-constants";

export function InfoModal({ modalShow, modalClose, productDetail }) {
  const dispatch = useDispatch();

  const deleteLocation = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProductLocation(id));
    }
  };
  const LocationDeletion = useSelector((state) => state.removeLocation);
  const { success, error } = LocationDeletion;

  useEffect(() => {
    if (success && !error) {
      modalClose();
      dispatch({ type: LOCATION_DELETE_RESET });
    }
  }, [dispatch, error, modalClose, success]);
  return (
    <CModal show={modalShow} onClose={modalClose} color="info" size="lg">
      <CModalHeader closeButton>
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
            {productDetail.stands &&
              (productDetail.stands.length !== 0 ? (
                <div>
                  <strong>Located At:</strong>
                  <ul>
                    {productDetail.stands.map((stand) => (
                      <>
                        <li style={{ position: "relative" }}>
                          {stand.location.quantity} pieces in{" "}
                          <strong>Zone</strong> {stand.location.zone_Symbol}{" "}
                          <strong>stand Number</strong> # {stand.stand_number}{" "}
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
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              ) : (
                <h4 style={{ color: "#920110" }}>Not Added To Any Zone Yet</h4>
              ))}
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
  );
}
