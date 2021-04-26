import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  UpdateProduct,
} from "../../actions/products-action";

import styles from "./dashboard.module.css";

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
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import { Image } from "react-bootstrap";
import { NewProductForm } from "../../components/new-product-form";
import { EditProductForm } from "../../components/edit-product-form";

const Dashboard = ({ match, history }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [danger, setDanger] = useState(false);
  const [info, setInfo] = useState(false);

  const [productDetail, setProductDetail] = useState({});

  const productCreate = useSelector((state) => state.productCreate);
  const { success } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: updateSuccess } = productUpdate;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: deleteSuccess } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const zonesReducer = useSelector((state) => state.allZones);
  const { loading, zones, error } = zonesReducer;
  const standReducer = useSelector((state) => state.allStands);
  const { stands: standsList } = standReducer;

  let calculatedStand;
  if (standsList) {
    calculatedStand = standsList.filter(
      (stand) => stand.id === productDetail.standId
    )[0];
  }

  console.log(calculatedStand);

  let calculatedZone;

  if (productDetail && zones) {
    calculatedZone = zones.filter((zone) => {
      let obj = zone.stands.some(({ id }) => id === productDetail.standId);
      return obj;
    })[0];
  }
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push("/login");
  //   }
  //   if (success || updateSuccess) {
  //     setOpenModal(false);
  //     setOpenEditModal(false);
  //     // setProduct_ar_name("");
  //     // setProduct_en_name("");
  //     // setProduct_ar_desc("");
  //     // setProduct_en_desc("");
  //     // setImage_url("");
  //     // setProduct_barcode("");
  //     // setProduct_sku("");
  //     // setModel_number("");
  //     // setQuantity("");

  //     setEditedProduct_ar_name("");
  //     setEditedProduct_en_name("");
  //     setEditedProduct_ar_desc("");
  //     setEditedProduct_en_desc("");
  //     setEditedProduct_barcode("");
  //     setEditedProduct_sku("");
  //     setEditedModel_number("");
  //     setEditedQuantity("");
  //     setEditedZone("");
  //     setEditedStand("");
  //   }

  //   if (deleteSuccess) {
  //     setDanger(false);
  //   }
  // }, [
  //   danger,
  //   deleteSuccess,
  //   dispatch,
  //   history,
  //   success,
  //   updateSuccess,
  //   userInfo,
  // ]);
  return (
    <>
      {!loading && !error && (
        <>
          {userInfo &&
            (userInfo.role === "super user" || userInfo.role === "editor") && (
              <CButton
                style={{
                  // float: "right",
                  borderColor: "#ee8332",
                  color: "#ee8332",
                  margin: "1rem",
                }}
                onClick={onOpenModal}
                variant="outline"
                size="lg"
              >
                Add New Product
              </CButton>
            )}

          <NewProductForm openModal={openModal} closeModal={onCloseModal} />

          <CRow>
            {products.map((product) => (
              <CCol
                key={product.id}
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="3"
                xxl="2"
              >
                <CCard>
                  <CCardHeader
                    style={{
                      color: "#ee8332",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <span>{product.product_en_name}</span>
                    {userInfo &&
                      (userInfo.role === "super user" ||
                        userInfo.role === "editor") && (
                        <div
                          className={`card-header-actions ${styles.__dropdown}`}
                        >
                          <CLink
                            className={`card-header-action ${styles.__dropbtn}`}
                          >
                            <i className="fas fa-bars"></i>
                          </CLink>
                          <div
                            className={styles.__dropdown_content}
                            style={{ color: "black" }}
                          >
                            <p
                              style={{ margin: "0", padding: "14px" }}
                              onClick={() => {
                                setInfo(!info);
                                setProductDetail(product);
                              }}
                            >
                              <i
                                className="fas fa-info-circle"
                                style={{ padding: ".5rem" }}
                              ></i>{" "}
                              Details
                            </p>
                            <p
                              style={{ margin: "0", padding: "14px" }}
                              onMouseEnter={() => {
                                setProductDetail(product);
                              }}
                              onClick={() => {
                                onOpenEditModal();
                                // setEditedProduct_ar_name(
                                //   product.product_ar_name
                                // );
                                // setEditedProduct_en_name(
                                //   product.product_en_name
                                // );
                                // setEditedProduct_ar_desc(
                                //   product.product_ar_desc
                                // );
                                // setEditedProduct_en_desc(
                                //   product.product_en_desc
                                // );
                                // setEditedProduct_barcode(
                                //   product.product_barcode
                                // );
                                // setEditedProduct_sku(product.product_sku);
                                // setEditedModel_number(product.model_number);
                              }}
                            >
                              <i
                                className="fas fa-edit"
                                style={{ padding: ".5rem" }}
                              ></i>{" "}
                              Edit
                            </p>
                            <p
                              style={{ margin: "0", padding: "14px" }}
                              onClick={() => {
                                setDanger(!danger);
                                setProductDetail(product);
                              }}
                            >
                              <i
                                className="fas fa-trash-alt"
                                style={{ padding: ".5rem" }}
                              ></i>{" "}
                              Delete
                            </p>
                          </div>
                        </div>
                      )}
                  </CCardHeader>
                  <CCardBody>
                    <div
                      style={{ margin: "auto", textAlign: "center" }}
                      className={styles.image_dropdown}
                    >
                      <Image
                        height={150}
                        width={150}
                        src={product.image_url}
                        alt=""
                        fluid
                      />
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>

          <CModal
            show={danger}
            onClose={() => setDanger(!danger)}
            color="danger"
            size="sm"
          >
            <CModalHeader closeButton>
              <CModalTitle>
                <strong>Delete</strong> {productDetail.name}
              </CModalTitle>
            </CModalHeader>
            <CModalBody style={{ fontWeight: "bold", fontStyle: "italic" }}>
              Warning: This Action Can't Be Undone
            </CModalBody>
            <CModalFooter>
              <CButton
                color="danger"
                onClick={() => dispatch(deleteProduct(productDetail.id))}
              >
                Delete
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setDanger(!danger)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
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
                    src={productDetail.image_url}
                    alt=""
                    fluid
                  />
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>

          <EditProductForm
            openModal={openEditModal}
            closeModal={onCloseEditModal}
          />

          {/* <Modal
            open={openEditModal}
            onClose={onCloseEditModal}
            center
            className={{ modal: "customModal" }}
          >
           
          </Modal> */}
        </>
      )}
    </>
  );
};

export default Dashboard;
