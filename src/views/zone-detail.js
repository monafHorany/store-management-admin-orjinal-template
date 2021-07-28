import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CTooltip,
} from "@coreui/react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewStand } from "../actions/stand-action";
import { fetchSingleZones } from "../actions/zone-action";
import { Toast } from "react-bootstrap";
const ZoneDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const zone_detail = useSelector((state) => state.singleZone);
  const { loading, zone } = zone_detail;
  const createdStand = useSelector((state) => state.standCreate);
  const { success, error } = createdStand;
  const [stand_label, setStand_label] = useState("");
  const [stand_capacity, setStand_capacity] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const formSumbit = () => {
    if (!stand_label) {
      alert("Stand label can't be blank");
    } else if (!stand_capacity) {
      alert("Stand capacity can't be blank");
    } else {
      dispatch(addNewStand(match.params.id, { stand_label, stand_capacity }));
    }
  };
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (success) {
      setOpenModal(false);
      setStand_label("");
      setStand_capacity("");
    } else if (error) {
      setShow(true);
    }
    dispatch(fetchSingleZones(match.params.id));
  }, [dispatch, error, match.params.id, success]);
  return (
    <>
      {!loading && (
        <>
          {userInfo &&
            (userInfo.role === "super user" || userInfo.role === "editor") && (
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      {zone.stands.length} Available{" "}
                      {zone.stands.length > 1 ? "stands" : "Stand"} in This Zone
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {zone.zone_capacity - zone.stands.length} available Empty
                      Spaces in This Zone
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <CTooltip content="Add New Stand" placement="bottom">
                        <CButton
                          block
                          color="success"
                          onClick={onOpenModal}
                          disabled={
                            zone.zone_capacity - zone.stands.length <= 0
                          }
                        >
                          Add New Stand
                          <i className="fas fa-plus ml-3"></i>
                        </CButton>
                      </CTooltip>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          <CRow>
            {zone.stands.map((stand) => (
              <CCol key={stand.id} xs="12" sm="6" md="4" lg="3">
                <CCard>
                  <CCardHeader>
                    <Link to={`/stand/${stand.id}`}>
                      Stand # {stand.stand_label}
                    </Link>
                  </CCardHeader>
                  <CCardBody>
                    <p style={{ color: "red" }}>
                      Stand Capacity:{" "}
                      <span style={{ color: "black" }}>
                        {stand.stand_capacity}
                      </span>
                    </p>
                    <p style={{ color: "green" }}>
                      Number of products:{" "}
                      <span style={{ color: "black" }}>
                        {stand.products.reduce(
                          (acc, item) => acc + item.location.quantity,
                          0
                        )}
                      </span>
                    </p>
                    <p style={{ color: "blue" }}>
                      filling Percentage:{" "}
                      <span style={{ color: "black" }}>
                        {(stand.products.reduce(
                          (acc, item) => acc + item.location.quantity,
                          0
                        ) *
                          100) /
                          stand.stand_capacity}{" "}
                        %
                      </span>
                    </p>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </>
      )}
      <Toast
        style={{
          color: "white",
          backgroundColor: "red",
          width: "40rem",
          height: "5rem",
          position: "sticky",
          textAlign: "center",
          margin: "auto",
          float: "left",
        }}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation={true}
      >
        <Toast.Body
          style={{
            padding: "1.75rem",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {error}
        </Toast.Body>
      </Toast>

      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        classNames={{ modal: "customModal" }}
      >
        <CRow>
          <CCol>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm autoComplete="new-password">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="far fa-flag"></i>{" "}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setStand_label(e.target.value)}
                        type="text"
                        value={stand_label}
                        placeholder="Stand label"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-warehouse"></i>{" "}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setStand_capacity(e.target.value)}
                        type="number"
                        value={stand_capacity}
                        placeholder="Stand Capacity"
                        autoComplete="new-password"
                      />
                    </CInputGroup>

                    <CRow className="justify-content-center">
                      <CButton
                        // disabled={loading}
                        color="primary"
                        className="px-4"
                        size="lg"
                        onClick={() => formSumbit()}
                      >
                        create
                      </CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </Modal>
    </>
  );
};

export default ZoneDetail;
