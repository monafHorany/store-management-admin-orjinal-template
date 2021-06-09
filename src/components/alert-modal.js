import {
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";
export function AlertModal({
  modalShow,
  modalClose,
  children,
  bottunFooter,
  confirmation,
  cancelation,
  size,
}) {
  return (
    <CModal show={modalShow} onClose={modalClose} color="danger" size={size}>
      <CModalHeader>
        <CModalTitle>{children} </CModalTitle>
      </CModalHeader>
      {bottunFooter && (
        <CModalFooter className="justify-content-center">
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
