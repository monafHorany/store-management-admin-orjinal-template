import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { createUser } from "../actions/user-action";
import { Toast } from "react-bootstrap";

const Craete = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const createdUser = useSelector((state) => state.userCreate);
  const { loading, success, error } = createdUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [role, setRole] = useState("");

  const formSumbit = () => {
    if (!name || !email || !phone_number || !password || !role) {
      alert("please fill all fields");
    } else if (password !== confirm) {
      alert("password does not match");
    } else {
      dispatch(
        createUser({ name, email, phone_number, password, confirm, role })
      );
    }
  };
  useEffect(() => {
    if (success) {
      history.push("/users");
    } else if (error) {
      setShow(true);
    }
  }, [dispatch, error, history, success]);
  console.log(name, email, phone_number, password, confirm, role);
  return (
    // <div className="c-app c-default-layout flex-row align-items-center">
    <>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs="12" sm="10" md="8" lg="6" xl="5" xxl="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm autoComplete="new-password">
                    <h1 style={{ textAlign: "center" }}>Create New User</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="name"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-envelope-square"></i>{" "}
                          {/* <CIcon name="cil-lock-locked" /> */}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="email"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-phone"></i>
                          {/* <CIcon name="cil-lock-locked" /> */}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setPhone_number(e.target.value)}
                        type="number"
                        placeholder="phone number"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) => setconfirm(e.target.value)}
                        type="password"
                        placeholder="confirm password"
                        autoComplete="off"
                      />
                    </CInputGroup>

                    <CFormGroup row>
                      <CCol md="12">
                        <CLabel
                          style={{ fontWeight: "bold", fontStyle: "italic" }}
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
                      <CCol xs="12" sm="12" md="12" style={{ display: "flex" }}>
                        <CFormGroup variant="custom-radio" inline>
                          <CInputRadio
                            onChange={(e) => {
                              setRole(e.target.value);
                              alert(
                                "be careful when you set super user role, this user can't be deleted or edited "
                              );
                            }}
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
                        disabled={loading}
                        color="primary"
                        className="px-4"
                        size="lg"
                        onClick={formSumbit}
                      >
                        Create
                      </CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

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
    </>
    // </div>
  );
};

export default Craete;
