import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";


const StandDetail = ({ match, history }) => {


  

  const zone_detail = useSelector((state) => state.singleZone);
  const { zone } = zone_detail;
  console.log(zone);
  let filterdStand;
  if (zone) {
    filterdStand = zone.stands.filter(
      (stand) => stand.id === +match.params.id
    )[0];
  }



  console.log(filterdStand);
  
  return (
    <>
      {filterdStand && (
        <>
          
          <CRow>
            {filterdStand.products.map((product) => (
              <CCol key={product.id} xs="12" sm="6" md="4" lg="3">
                <CCard>
                  <CCardHeader style={{ color: "red" }}>
                    product name:
                    <span style={{ color: "black" }}>
                      {product.product_en_name}
                    </span>
                  </CCardHeader>
                  <CCardBody></CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </>
      )}

      
    </>
  );
};

export default StandDetail;
