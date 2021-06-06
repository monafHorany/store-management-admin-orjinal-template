import { CButton } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import styles from "./order.module.css";
import { fetchOrderDetailById, processNewBill } from "../actions/order";
import { PROCESS_NEW_BILL_RESET } from "../constants/order-constants";
import { BillInfoModal } from "../components/bill-info";

const OrderDetail = ({ match }) => {
  const dispatch = useDispatch();
  const orderReducer = useSelector((state) => state.singleOrder);
  const { loading, order } = orderReducer;
  const BillReducer = useSelector((state) => state.newBill);
  const { loading: BillLoading, success, message, error } = BillReducer;

  const [info, setInfo] = useState(false);

  const id = match.params.id;

  useEffect(() => {
    dispatch(fetchOrderDetailById(id));
    if (success || error) {
      setInfo(true);
    }
  }, [dispatch, error, id, success]);

  const columns = [
    {
      dataField: "itemName",
      text: "Product Name",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Quantity",
      text: "Quantity",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "SKU",
      text: "SKU",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
    {
      dataField: "Total",
      text: "Product Price",
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
  ];

  const orderData =
    !loading &&
    order &&
    order.order_items.map((item) => ({
      itemName: item.item_name,
      Quantity: item.item_quantity,
      SKU: item.item_sku,
      Total: item.total,
    }));
  return order ? (
    <React.Fragment>
      <div>
        <ul style={{ color: "#FFFFFF" }}>
          <li>{order.order_owner_name}</li>
          <li>{order.order_owner_phone_number}</li>
          <li>{order.order_owner_email}</li>
          <li>{order.currency}</li>
          <li>{order.total}</li>
        </ul>
        <BootStrapTable
          keyField="itemName"
          data={orderData}
          columns={columns}
          headerClasses={styles.header_class}
        />
        <div style={{ textAlignLast: "center" }}>
          <CButton
            disabled={BillLoading}
            color="success"
            size="lg"
            onClick={() => dispatch(processNewBill(order.order_items))}
          >
            Pull This Order
          </CButton>
        </div>
      </div>

      <BillInfoModal
        modalShow={info}
        color={success ? "success" : error ? "danger" : "primary"}
        // modalClose={() => {
        //   setInfo(false);
        //   success
        //     ? (document.location.href = "/order")
        //     : window.location.reload();
        // }}
        header={success ? "New bill Created" : "Some thing went wrong"}
        bottunFooter
        ok={() => {
          setInfo(false);
          dispatch({ type: PROCESS_NEW_BILL_RESET });
          success
            ? document.location.replace("http://localhost:3000/order")
            : window.location.reload();
        }}
        bodyText={
          error ? (
            error
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: message,
              }}
            ></div>
          )
        }
      />
    </React.Fragment>
  ) : (
    <div>loading</div>
  );
};

export default OrderDetail;
