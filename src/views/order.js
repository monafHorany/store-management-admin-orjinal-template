import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

const Order = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const transformedListOfUsers = [];

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
  //   dispatch({ type: USER_CREATE_RESET });
  //   dispatch({ type: USER_DELETE_RESET });

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const history = useHistory();
  const fields = ["Order", "Date", "Status", "Billing", "Ship to", "Total"];

  return (
    <CRow className="justify-content-center">
      <CCol xs="12" lg="6">
        <CCard>
          <CCardHeader>Striped Table</CCardHeader>
          <CCardBody>
            <CDataTable
              //   items={usersData}
              fields={fields}
              striped
              itemsPerPage={5}
              pagination
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Order;
