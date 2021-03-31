import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import usersData from "./UsersData";

const User = ({ match }) => {
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;
  const user = users.find((user) => user.id === +match.params.id);

  console.log(user);
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>User id: {match.params.id}</CCardHeader>
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
