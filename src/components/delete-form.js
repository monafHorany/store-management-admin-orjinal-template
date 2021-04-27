import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/products-action";

export function DeleteFrom({ modalShow, modalClose, productDetail }) {
  const dispatch = useDispatch();
  return (
    <CModal show={modalShow} onClose={modalClose} color="danger" size="sm">
      <CModalHeader closeButton>
        <CModalTitle>
          <strong>Delete</strong> {productDetail.product_en_name}
        </CModalTitle>
      </CModalHeader>
      <CModalBody style={{ fontWeight: "bold", fontStyle: "italic" }}>
        Warning: This Action Can't Be Undone
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={() => dispatch(deleteProduct(productDetail.id))}
        >
          Delete
        </CButton>{" "}
        <CButton color="secondary" onClick={modalClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
