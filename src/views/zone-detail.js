import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleZones } from "../actions/zone-action";

const ZoneDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const zone_detail = useSelector((state) => state.singleZone);
  const { loading, zone } = zone_detail;
  console.log(loading);

  useEffect(() => {
    dispatch(fetchSingleZones(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      {!loading && (
        <>
          <h3>
            {zone.stands.length} available{" "}
            {zone.stands.length > 1 ? "stands" : "stand"} In Zone{" "}
            {zone.zone_symbol}
          </h3>
          <CRow>
            {zone.stands.map((stand) => (
              <CCol key={stand.id} xs="12" sm="6" md="4" lg="3">
                <CCard>
                  <CCardHeader>
                    <Link to={`/stand/${stand.id}`}>
                      Stand # {stand.stand_number}
                    </Link>
                  </CCardHeader>
                  <CCardBody>
                    <p style={{ color: "red" }}>
                      Stand Capacity:{" "}
                      <span style={{ color: "black" }}>
                        {stand.stand_capacity}
                      </span>
                    </p>
                    <p style={{ color: "green" }}>
                      number of products:{" "}
                      <span style={{ color: "black" }}>
                        {stand.products.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    </p>
                    <p style={{ color: "blue" }}>
                      filling Percentage:{" "}
                      <span style={{ color: "black" }}>
                        {((stand.products.reduce((acc, item) => acc + item.quantity, 0)) * stand.stand_capacity) / 100}{" "}
                        %
                      </span>
                    </p>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </>
      )}
    </>
  );
};

export default ZoneDetail;
