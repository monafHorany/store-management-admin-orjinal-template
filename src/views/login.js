import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { login } from "../actions/user-action";
import { Toast } from "react-bootstrap";

const Login = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginForm = () => {
    if (!email) {
      alert("email can't be empty");
    } else if (!password) {
      alert("password can't be empty");
    } else {
      dispatch(login(email, password));
    }
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    } else if (error) {
      setShow(true);
    }
  }, [error, history, userInfo]);

  return (
    <>
      <Toast
        style={{
          color: "white",
          backgroundColor: "red",
          width: "40rem",
          height: "5rem",
          textAlign: "center",
          position: "absolute",
          top: 0,
          right: 0,
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs="12" sm="10" md="8" lg="6" xl="5" xxl="4">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email"
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
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="12">
                          <CButton
                            color="primary"
                            className="px-4"
                            block
                            onClick={loginForm}
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
