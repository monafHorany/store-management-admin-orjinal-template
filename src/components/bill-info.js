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
