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
export function AlertModal({
  modalShow,
  modalClose,
  children,
  bottunFooter,
  confirmation,
  cancelation,
}) {
  return (
    <CModal show={modalShow} onClose={modalClose} color="danger" size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{children} </CModalTitle>
      </CModalHeader>
      {bottunFooter && (
        <CModalFooter>
          <CButton color="danger" onClick={confirmation}>
            OK
          </CButton>{" "}
          <CButton color="secondary" onClick={cancelation}>
            Cancel
          </CButton>
        </CModalFooter>
      )}
    </CModal>
  );
}
