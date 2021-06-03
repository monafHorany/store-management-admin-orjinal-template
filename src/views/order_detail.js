import { CButton } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetailById } from "../actions/order";

const OrderDetail = ({ match }) => {
  const dispatch = useDispatch();
  const orderReducer = useSelector((state) => state.singleOrder);
  const { loading, order } = orderReducer;
  const id = match.params.id;
  console.log(order);

  useEffect(() => {
    dispatch(fetchOrderDetailById(id));
  }, [dispatch, id]);
  return order ? (
    <div>
      <ul>
        <li>{order.order_owner_name}</li>
        <li>{order.order_owner_phone_number}</li>
        <li>{order.order_owner_email}</li>
        <li>{order.currency}</li>
        <li>{order.total}</li>
        <ul>
          {order.order_items.map((item) => (
            <React.Fragment key={item.id}>
              <li>{item.item_name}</li>
              <li>{item.item_price.toFixed(2)}</li>
              <li>{item.item_quantity}</li>
              <li>{item.item_sku}</li>
            </React.Fragment>
          ))}
        </ul>
      </ul>
      <CButton color="success" size="lg">
        Pull This Order
      </CButton>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default OrderDetail;
