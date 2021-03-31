import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import usersData from "./UsersData";
import { USER_CREATE_RESET } from "../../constants/user-constants";

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const transformedListOfUsers = [];
  console.log(users);

  if (!loading && users) {
    users.map((user) =>
      transformedListOfUsers.push({
        id: user.id,
        name: user.name,
        registered: new Date(user.createdAt).toLocaleString(),
        role: user.role,
      })
    );
  }
  console.log(transformedListOfUsers);
  dispatch({ type: USER_CREATE_RESET });

  const history = useHistory();

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={12} md={12} lg={6} xl={6} style={{ minWidth: "600px" }}>
        <CCard>
          <CCardHeader>Users List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={transformedListOfUsers}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "registered",
                "role",
              ]}
              hover
              striped
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
