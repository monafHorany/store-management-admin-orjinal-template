import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-modal/styles.css";
import { useHistory } from "react-router-dom";

import { Modal } from "react-responsive-modal";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CHeader,
  CHeaderNav,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CToggler,
  CTooltip,
} from "@coreui/react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addNewZones } from "../actions/zone-action";
import { Image } from "react-bootstrap";

const TheHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);
  const zoneCreate = useSelector((state) => state.zoneCreate);
  const { success } = zoneCreate;

  const [searchValue, setSearchValue] = useState("");

  const [zone_symbol, setZone_symbol] = useState("");
  const [zone_capacity, setZone_capacity] = useState("");

  const [searchTerm, setSearchTerm] = useState("Search By Product Name");

  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const formSumbit = () => {
    if (!zone_symbol) {
      alert("zone symbol can't be blank");
    } else if (!zone_capacity) {
      alert("zone capacity can't be blank");
    } else {
      dispatch(addNewZones({ zone_symbol, zone_capacity }));
    }
  };

  const [productDetail, setProductDetail] = useState({});
  const [info, setInfo] = useState(false);
  const zonesReducer = useSelector((state) => state.allZones);
  const { loading, zones, error } = zonesReducer;

  let calculatedZone;

  if (productDetail && zones) {
    calculatedZone = zones.filter((zone) => {
      let obj = zone.stands.some(({ id }) => id === productDetail.standId);
      return obj;
    })[0];
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (success) {
      setOpenModal(false);
    }

    if (!userInfo) {
      history.push("/login");
    }
  }, [history, success, userInfo]);

  return (
    <>
      {!loading && !error ? (
        <>
          <CHeader>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            />
            {userInfo && userInfo.role === "super user" && (
              <CTooltip
                content="Add New Zone"
                placement="bottom"
                // className="ml-sm-auto"
              >
                <div
                  className="ml-sm-auto ml-xs-auto mr-md-auto"
                  onClick={() => onOpenModal()}
                  style={{ margin: "10px" }}
                >
                  <i
                    className="fas fa-map-marked-alt fa-3x"
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      cursor: "pointer",
                    }}
                  ></i>{" "}
                </div>
              </CTooltip>
            )}
            <CHeaderNav className="d-md-down-none m-auto w-50">
              <Autocomplete
                size="small"
                autoComplete
                className="w-100"
                getOptionLabel={(option) =>
                  option && searchTerm === "Search By Product Name"
                    ? option.product_en_name
                    : option && searchTerm === "Search By SKU"
                    ? option.product_sku
                    : option && searchTerm === "Search By Model Number"
                    ? option.model_number
                    : ""
                }
                clearOnBlur={true}
                clearOnEscape={true}
                freeSolo
                id="free-solo-demo"
                value={searchValue}
                disableClearable
                onChange={(event, value, reason) => {
                  setInfo(!info);
                  setProductDetail(value);
                  if (reason === "select-option") {
                    setSearchValue("");
                  }
                }}
                options={products}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={searchValue}
                    label={searchTerm}
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </CHeaderNav>
            <CHeaderNav className="px-3 d-md-down-none">
              <CDropdown className="m-1 btn-group" direction="down">
                <CDropdownToggle color="success">{searchTerm}</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    onClick={() => setSearchTerm("Search By Product Name")}
                  >
                    Search By Product Name
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setSearchTerm("Search By SKU")}>
                    Search By SKU
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => setSearchTerm("Search By Model Number")}
                  >
                    Search By Model Number
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CHeaderNav>
          </CHeader>

          <Modal
            open={openModal}
            onClose={onCloseModal}
            center
            classNames={{ modal: "customModal" }}
          >
            <CRow>
              <CCol>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm autoComplete="new-password">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <i className="far fa-flag"></i>{" "}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={(e) => setZone_symbol(e.target.value)}
                            type="text"
                            value={zone_symbol}
                            placeholder="Zone Symbol"
                            autoComplete="new-password"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <i className="fas fa-warehouse"></i>{" "}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={(e) => setZone_capacity(e.target.value)}
                            type="number"
                            value={zone_capacity}
                            placeholder="Zone Capacity"
                            autoComplete="new-password"
                          />
                        </CInputGroup>

                        <CRow className="justify-content-center">
                          <CButton
                            // disabled={loading}
                            color="primary"
                            className="px-4"
                            size="lg"
                            onClick={() => formSumbit()}
                          >
                            create
                          </CButton>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </Modal>
        </>
      ) : (
        <h3>...loading</h3>
      )}

      {calculatedZone && (
        <CModal
          show={info}
          onClose={() => setInfo(!info)}
          color="info"
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>{productDetail.product_en_name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <div>
                  <strong>name: </strong> {productDetail.product_en_name}
                </div>{" "}
                <br />
                <strong>description: </strong>{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetail.product_en_desc,
                  }}
                ></div>{" "}
                <br />
                <div>
                  <strong>product_sku: </strong>
                  {productDetail.product_sku}
                </div>{" "}
                <br />
                <div>
                  <strong>quantity: </strong> {productDetail.quantity}
                </div>{" "}
                <br />
                <div>
                  <strong>model_number: </strong> {productDetail.model_number}
                </div>{" "}
                <br />
                <div>
                  <strong>Location: </strong>{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "blue",
                    }}
                  >
                    ZONE:{" "}
                  </span>{" "}
                  {calculatedZone.zone_symbol}{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "blue",
                    }}
                  >
                    STAND:{" "}
                  </span>{" "}
                  {productDetail.standId}
                </div>{" "}
                <br />
                <div>
                  <strong>added at: </strong>{" "}
                  {new Date(productDetail.createdAt).toLocaleString()}{" "}
                </div>
              </CCol>
              <CCol>
                <Image
                  height={300}
                  width={300}
                  src={
                    process.env.REACT_APP_BACKEND_URL + productDetail.image_url
                  }
                  alt=""
                  fluid
                />
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </>
  );
};

export default TheHeader;
