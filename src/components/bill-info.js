import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Button, Modal } from "react-bootstrap";
import React from "react";
export function BillInfoModal({
  modalShow,
  modalClose,
  header,
  bottunFooter,
  confirmation,
  cancelation,
  bodyText,
  ok,
}) {
  return (
    // <CModal show={modalShow} onClose={modalClose} color={color} size={size}>
    //   <CModalHeader closeButton>
    //     <CModalTitle>{header} </CModalTitle>
    //   </CModalHeader>
    //   <CModalBody>{bodyText} </CModalBody>
    //   {bottunFooter && !ok && (
    //     <CModalFooter>
    //       <CButton color="danger" onClick={confirmation}>
    //         OK
    //       </CButton>{" "}
    //       <CButton color="secondary" onClick={cancelation}>
    //         Cancel
    //       </CButton>
    //     </CModalFooter>
    //   )}
    //   {bottunFooter && ok && (
    //     <CModalFooter>
    //       <CButton color="success" onClick={ok}>
    //         OK
    //       </CButton>{" "}
    //     </CModalFooter>
    //   )}
    // </CModal>
    <Modal
      show={modalShow}
      onHide={modalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      {bottunFooter && !ok && (
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelation}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmation}>
            OK
          </Button>
        </Modal.Footer>
      )}
      {bottunFooter && ok && (
        <Modal.Footer>
          <Button variant="secondary" onClick={ok}>
            ok
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
