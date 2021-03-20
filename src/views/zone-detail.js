import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleZones } from "../actions/zone-action";

const ZoneDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const zone_detail = useSelector((state) => state.singleZone);
  const { loading, zone, error } = zone_detail;
  console.log(loading);

  useEffect(() => {
    dispatch(fetchSingleZones(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      {!loading && (
        <>
          <h3>{zone.stands.length} available stand In This Zone</h3>
          <CRow>
            {zone.stands.map((stand) => (
              <CCol xs="12" sm="6" md="4" lg="3">
                <CCard>
                  <CCardHeader>Stand # {stand.stand_number}</CCardHeader>
                  <CCardBody>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
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
