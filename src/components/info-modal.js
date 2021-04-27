import {
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React from "react";
import { Image } from "react-bootstrap";

export function InfoModal({ modalShow, modalClose, productDetail }) {
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
            <br />
            <div>
              <strong>added at: </strong>{" "}
              {new Date(productDetail.createdAt).toLocaleString()}{" "}
            </div>
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
