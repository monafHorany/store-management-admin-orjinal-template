import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./user.module.css";
import "react-responsive-modal/styles.css";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputRadio,
  CLabel,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { deleteUser, updateUser } from "../../actions/user-action";
import { Modal } from "react-responsive-modal";
import CIcon from "@coreui/icons-react";

const User = ({ match, history }) => {
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: updateSuccess } = userUpdate;
  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;
  const user = users && users.find((user) => user.id === +match.params.id);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("");

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const formSumbit = (id) => {
    if (!name || !email || !phone_number || !role) {
      alert("please fill all fields");
    } else {
      dispatch(updateUser(id, { name, email, phone_number, role }));
    }
  };

  const [danger, setDanger] = useState(false);
  useEffect(() => {
    if (success) {
      setDanger(!danger);
      history.push("/users");
    }
    if (!user) {
      history.push("/users");
    }

    if (updateSuccess) {
      setOpenModal(false);
    }
  }, [danger, history, success, updateSuccess, user]);
  return (
    <>
      {!loading && (
        <>
          <CRow className="justify-content-center">
            <CCol lg={6}>
              <CCard>
                <CCardHeader
                  className="d-flex justify-content-between"
                  dir="rtl"
                >
                  {user.role !== "super user" && (
                    <div className={`card-header-actions ${styles.__dropdown}`}>
                      <CLink
                        className={`card-header-action ${styles.__dropbtn}`}
                      >
                        <i className="fas fa-bars"></i>
                      </CLink>
                      <div
                        className={styles.__dropdown_content}
                        style={{ color: "black" }}
                      >
                        <p
                          style={{ margin: "0", padding: "14px" }}
                          onClick={() => {
                            onOpenModal();
                            setName(user.name);
                            setEmail(user.email);
                            setPhone_number(user.phone_number);
                            setRole(user.role);
                          }}
                        >
                          <i
                            className="fas fa-edit"
                            style={{ padding: ".5rem" }}
                          ></i>{" "}
                          Edit
                        </p>
                        <p
                          style={{ margin: "0", padding: "14px" }}
                          onClick={() => {
                            setDanger(!danger);
                          }}
                        >
                          <i
                            className="fas fa-trash-alt"
                            style={{ padding: ".5rem" }}
                          ></i>{" "}
                          Delete
                        </p>
                      </div>
                    </div>
                  )}
                </CCardHeader>
                <CCardBody>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>User Id</td>
                        <td>
                          <strong>{user.id}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>name</td>
                        <td>
                          <strong>{user.name}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>
                          <strong>{user.role}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CModal
            show={danger}
            onClose={() => setDanger(!danger)}
            color="danger"
            size="sm"
          >
            <CModalHeader closeButton>
              <CModalTitle>
                <strong>Delete</strong> {user.name}
              </CModalTitle>
            </CModalHeader>
            <CModalBody style={{ fontWeight: "bold", fontStyle: "italic" }}>
              Warning: This Action Can't Be Undone
            </CModalBody>
            <CModalFooter>
              <CButton
                color="danger"
                onClick={() => dispatch(deleteUser(user.id))}
              >
                Delete
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setDanger(!danger)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>

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
                        <h1 style={{ textAlign: "center" }}>
                          Edit {user.name}
                        </h1>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                            placeholder="name"
                            autoComplete="new-password"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <i className="fas fa-envelope-square"></i>{" "}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="email"
                            autoComplete="new-password"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <i className="fas fa-phone"></i>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={(e) => setPhone_number(e.target.value)}
                            type="number"
                            value={phone_number}
                            placeholder="phone number"
                            autoComplete="new-password"
                          />
                        </CInputGroup>

                        <CFormGroup row>
                          <CCol md="12">
                            <CLabel
                              style={{
                                fontWeight: "bold",
                                fontStyle: "italic",
                              }}
                            >
                              Role:{" "}
                              <span
                                style={{
                                  fontWeight: "normal",
                                  fontStyle: "italic",
                                }}
                              >
                                select carefully
                              </span>
                            </CLabel>
                          </CCol>
                          <CCol
                            xs="12"
                            sm="12"
                            md="12"
                            style={{ display: "flex" }}
                          >
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                onChange={(e) => {
                                  setRole(e.target.value);
                                  alert(
                                    "be careful when you set super user role, this user can't be deleted or edited "
                                  );
                                }}
                                checked={role === "super user"}
                                custom
                                id="inline-radio1"
                                name="inline-radios"
                                value="super user"
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="inline-radio1"
                              >
                                super user
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                onChange={(e) => {
                                  setRole(e.target.value);
                                }}
                                checked={role === "editor"}
                                custom
                                id="inline-radio2"
                                name="inline-radios"
                                value="editor"
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="inline-radio2"
                              >
                                editor
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                onChange={(e) => {
                                  setRole(e.target.value);
                                }}
                                checked={role === "inspector"}
                                custom
                                id="inline-radio3"
                                name="inline-radios"
                                value="inspector"
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="inline-radio3"
                              >
                                inspector
                              </CLabel>
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>
                        <CRow className="justify-content-center">
                          <CButton
                            // disabled={loading}
                            color="primary"
                            className="px-4"
                            size="lg"
                            onClick={() => formSumbit(user.id)}
                          >
                            Edit
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
      )}
    </>
  );
};

export default User;
