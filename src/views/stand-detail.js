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
import React, { useEffect, useState } from "react";
import styles from "./stand.module.css";
import { useDispatch, useSelector } from "react-redux";

import { Image } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  deleteProduct,
  listProductsByStandId,
  UpdateProduct,
} from "../actions/products-action";
const StandDetail = ({ match, history }) => {
  const zone_detail = useSelector((state) => state.singleZone);
  const { zone: zoneDetail } = zone_detail;
  console.log(zoneDetail);
  let filterdStand;
  if (zoneDetail) {
    filterdStand = zoneDetail.stands.filter(
      (stand) => stand.id === +match.params.id
    )[0];
  }

  const dispatch = useDispatch();

  const zonesReducer = useSelector((state) => state.allZones);
  const { zones } = zonesReducer;
  const standProduct = useSelector((state) => state.standProduct);
  const { loading, products } = standProduct;

  console.log(filterdStand);

  const [danger, setDanger] = useState(false);

  const [info, setInfo] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);

  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);

  const [product_ar_name, setEditedProduct_ar_name] = useState();
  const [product_en_name, setEditedProduct_en_name] = useState();
  const [product_ar_desc, setEditedProduct_ar_desc] = useState();
  const [product_en_desc, setEditedProduct_en_desc] = useState();
  const [product_barcode, setEditedProduct_barcode] = useState();
  const [product_sku, setEditedProduct_sku] = useState();
  const [model_number, setEditedModel_number] = useState();
  const [quantity, setEditedQuantity] = useState();
  const [zone, setEditedZone] = useState();
  const [standId, setEditedStand] = useState();

  let stands = [];

  if (zone && zones) {
    stands = zones[zone - 1].stands;
  }
  let selectedStand;

  if (standId && stands.length !== 0) {
    selectedStand = stands.filter((s) => +s.id === +standId)[0];
  }

  let calculatedZone;

  if (productDetail && zones) {
    calculatedZone = zones.filter((zone) => {
      let obj = zone.stands.some(({ id }) => id === productDetail.standId);
      console.log(obj);
      return obj;
    })[0];
  }

  const editForm = (e) => {
    if (standId && selectedStand) {
      if (quantity > selectedStand.stand_capacity) {
        alert("inserted quantity is greater than stand capacity");
      } else if (
        product_ar_name &&
        product_en_name &&
        product_ar_desc &&
        product_en_desc &&
        product_barcode &&
        product_sku &&
        model_number &&
        quantity &&
        standId
      ) {
        dispatch(
          UpdateProduct(productDetail.id, {
            product_ar_name,
            product_en_name,
            product_ar_desc,
            product_en_desc,
            product_barcode,
            product_sku,
            model_number,
            quantity,
            standId,
          })
        );
      } else {
        alert("Please Fill All Fields");
      }
    }
  };

  useEffect(() => {
    dispatch(listProductsByStandId(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      {!loading && (
        <>
          <CRow>
            {products.map((product) => (
              <CCol
                key={product.id}
                xs="12"
                sm="6"
                md="3"
                lg="3"
                xl="2"
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
                    <span style={{ color: "black", whiteSpace: "nowrap" }}>
                      {product.product_en_name}
                    </span>
                    <div className={`card-header-actions ${styles.__dropdown}`}>
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
                            setEditedProduct_ar_name(product.product_ar_name);
                            setEditedProduct_en_name(product.product_en_name);
                            setEditedProduct_ar_desc(product.product_ar_desc);
                            setEditedProduct_en_desc(product.product_en_desc);
                            setEditedProduct_barcode(product.product_barcode);
                            setEditedProduct_sku(product.product_sku);
                            setEditedModel_number(product.model_number);
                            setEditedQuantity(product.quantity);
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
                  </CCardHeader>
                  <CCardBody>
                    <div
                      style={{ margin: "auto", textAlign: "center" }}
                      className={styles.image_dropdown}
                    >
                      <Image
                        height={150}
                        width={150}
                        src={
                          process.env.REACT_APP_BACKEND_URL + product.image_url
                        }
                        alt=""
                        fluid
                      />
                      <div className={styles.image_dropdown_content}>
                        <Image
                          height={800}
                          width={800}
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            product.image_url
                          }
                          alt=""
                          fluid
                        />
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </>
      )}

      <Modal
        open={openEditModal}
        onClose={onCloseEditModal}
        center
        className={{ modal: "customModal" }}
      >
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Product Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        type="text"
                        onChange={(e) =>
                          setEditedProduct_ar_name(e.target.value)
                        }
                        value={product_ar_name}
                        placeholder="Product Name in Arabic"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Product Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        onChange={(e) =>
                          setEditedProduct_en_name(e.target.value)
                        }
                        required
                        type="text"
                        value={product_en_name}
                        placeholder="Product Name in English"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        product description
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
                        onChange={(event, editedproduct_ar_desc) => {
                          setEditedProduct_ar_desc(
                            editedproduct_ar_desc.getData()
                          );
                        }}
                        // onChange={(e)=>setar_description(e.target.value)}
                        required
                        config={{ language: "ar" }}
                        editor={ClassicEditor}
                        placeholder="product description in Arabic"
                        data={product_ar_desc}
                        dir="rtl"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        product description
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
                        onChange={(event, editedproduct_en_desc) => {
                          setEditedProduct_en_desc(
                            editedproduct_en_desc.getData()
                          );
                        }}
                        required
                        editor={ClassicEditor}
                        placeholder="product description in English"
                        data={product_en_desc}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">product barcode</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        onChange={(e) =>
                          setEditedProduct_barcode(e.target.value)
                        }
                        type="number"
                        value={product_barcode}
                        placeholder="product barcode"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">SKU Code</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        onChange={(e) => setEditedProduct_sku(e.target.value)}
                        type="text"
                        value={product_sku}
                        placeholder="SKU Code"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Model Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        onChange={(e) => setEditedModel_number(e.target.value)}
                        type="text"
                        value={model_number}
                        placeholder="Model Number"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">quantity</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        onChange={(e) => {
                          setEditedQuantity(e.target.value);
                        }}
                        type="number"
                        value={quantity}
                        placeholder="quantity"
                      />
                    </CCol>
                    <div style={{ margin: "auto" }}>
                      <p style={{ fontSize: "11px", margin: "auto" }}>
                        {" "}
                        make sure that quantity is not greater than stand
                        capcity{" "}
                      </p>
                    </div>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">select Zone</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        dir="ltr"
                        custom
                        size="sm"
                        name="selectSm"
                        id="SelectLm"
                        onChange={(e) => {
                          setEditedZone(e.target.value);
                        }}
                      >
                        <option></option>
                        {zones.map((zone, index) => (
                          <option key={index} value={zone.id}>
                            Zone {zone.zone_symbol}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">select stand</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        dir="ltr"
                        custom
                        size="sm"
                        placeholder="set zone and quantity"
                        disabled={!zone || !quantity}
                        name="selectSm"
                        id="SelectLm"
                        onChange={(e) => {
                          setEditedStand(e.target.value);
                        }}
                      >
                        <option></option>
                        {stands.map((stand, index) => (
                          <option
                            key={index}
                            value={stand.id}
                            style={{
                              color:
                                +stand.stand_capacity -
                                  stand.products.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                  ) ===
                                  0 && "red",
                            }}
                            disabled={
                              +stand.stand_capacity -
                                stand.products.reduce(
                                  (acc, item) => acc + item.quantity,
                                  0
                                ) ===
                                0 ||
                              quantity >
                                +stand.stand_capacity -
                                  stand.products.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                  )
                            }
                          >
                            {stand.stand_number} available places{" "}
                            {+stand.stand_capacity -
                              stand.products.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                              )}
                            {+stand.stand_capacity -
                              stand.products.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                              ) ===
                              0 && " full"}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter style={{ textAlign: "center" }}>
                <CButton
                  disabled={
                    !product_ar_name ||
                    !product_en_name ||
                    !product_ar_desc ||
                    !product_en_desc ||
                    !product_barcode ||
                    !product_sku ||
                    !model_number ||
                    !quantity ||
                    !zone ||
                    !standId
                  }
                  style={{ borderColor: "#ee8332", color: "#ee8332" }}
                  onClick={editForm}
                  type="button"
                  variant="outline"
                  size="lg"
                >
                  OK
                  <i className="fas fa-pen" style={{ marginLeft: "1em" }}></i>
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </Modal>

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
    </>
  );
};

export default StandDetail;
