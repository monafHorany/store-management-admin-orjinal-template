import React from "react";
import { useSelector } from "react-redux";
import styles from "./user.module.css";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
} from "@coreui/react";

const User = ({ match }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const user = users.find((user) => user.id === +match.params.id);

  console.log(user);
  return (
    <CRow className="justify-content-center">
      <CCol lg={6}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <p>User id: {match.params.id}</p>
            <div className={`card-header-actions ${styles.__dropdown}`}>
              <CLink className={`card-header-action ${styles.__dropbtn}`}>
                <i className="fas fa-bars"></i>
              </CLink>
              <div
                className={styles.__dropdown_content}
                style={{ color: "black" }}
              >
                <p style={{ margin: "0", padding: "14px" }} onClick={() => {}}>
                  <i
                    className="fas fa-info-circle"
                    style={{ padding: ".5rem" }}
                  ></i>{" "}
                  Details
                </p>
                <p style={{ margin: "0", padding: "14px" }}>
                  <i className="fas fa-edit" style={{ padding: ".5rem" }}></i>{" "}
                  Edit
                </p>
                <p style={{ margin: "0", padding: "14px" }} onClick={() => {}}>
                  <i
                    className="fas fa-trash-alt"
                    style={{ padding: ".5rem" }}
                  ></i>{" "}
                  Delete
                </p>
              </div>
            </div>
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
  );
};

export default User;
