import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../../actions/products-action";
import { Modal } from "react-responsive-modal";
// import styles from "./dashboard.module.css";
import "react-responsive-modal/styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  CRow,
  CSelect,
} from "@coreui/react";
import { Image } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
// import { PRODUCT_CREATE_RESET } from "../../constants/product-constants";

const Dashboard = ({ match, history }) => {
  const [openModal1, setOpenModal1] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  let { success } = productCreate;

  console.log(success);

  const zones = useSelector((state) => state.allZones.zones);

  console.log(zones);

  const [product_ar_name, setProduct_ar_name] = useState("");
  const [product_en_name, setProduct_en_name] = useState("");
  const [product_ar_desc, setProduct_ar_desc] = useState(
    "product description in Arabic"
  );
  const [product_en_desc, setProduct_en_desc] = useState(
    "product description in English"
  );
  const [image_url, setImage_url] = useState();
  const [product_barcode, setProduct_barcode] = useState("");
  const [product_sku, setProduct_sku] = useState("");
  const [model_number, setModel_number] = useState("");
  const [quantity, setQuantity] = useState("");
  const [zone, setZone] = useState("");
  const [stand, setStand] = useState("");

  let stands = [];
  if (zone) {
    stands = zones[zone - 1].stands;
  }
  console.log("stands", stands);
  console.log("stand", stand);
  let selectedStand;
  if (stand && stands.length !== 0) {
    selectedStand = stands.filter((s) => +s.id === +stand)[0];
  }

  console.log(selectedStand);

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_ar_name", product_ar_name);
    formData.append("product_en_name", product_en_name);
    formData.append("product_ar_desc", product_ar_desc);
    formData.append("product_en_desc", product_en_desc);
    formData.append("image_url", image_url);
    formData.append("product_barcode", product_barcode);
    formData.append("product_sku", product_sku);
    formData.append("model_number", model_number);
    formData.append("quantity", quantity);
    formData.append("standId", stand);
    if (stand && selectedStand) {
      if (quantity > selectedStand.stand_capacity) {
        alert("inserted quantity is greater than stand capacity");
      } else if (
        product_ar_name &&
        product_en_name &&
        product_ar_desc &&
        product_en_desc &&
        image_url &&
        product_barcode &&
        product_sku &&
        model_number &&
        stand
      ) {
        dispatch(createProduct(formData));
      } else {
        alert("Please Fill All Fields");
      }
    }
    console.log(formData);
  };

  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;

  const onOpenModal1 = () => setOpenModal1(true);
  const onCloseModal1 = () => setOpenModal1(false);

  useEffect(() => {
    if (success) {
      setOpenModal1(false);
      setProduct_ar_name("");
      setProduct_en_name("");
      setProduct_ar_desc("");
      setProduct_en_desc("");
      setImage_url("");
      setProduct_barcode("");
      setProduct_sku("");
      dispatch(listProducts());
    }
  }, [dispatch, history, success]);
  console.log(success);
  return (
    <>
      {/* {success && <div className={styles.message}></div>} */}
      <CButton
        style={{
          // float: "right",
          borderColor: "#ee8332",
          color: "#ee8332",
          margin: "1rem",
        }}
        onClick={onOpenModal1}
        variant="outline"
        size="lg"
      >
        Add New Product
      </CButton>

      <Modal
        open={openModal1}
        onClose={onCloseModal1}
        center
        classNames={{ modal: "customModal" }}
      >
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader
                style={{
                  textAlign: "center",
                  backgroundColor: "#ee8332",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  letterSpacing: ".5em",
                }}
              >
                Add Product
              </CCardHeader>
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
                        onChange={(e) => setProduct_ar_name(e.target.value)}
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
                        onChange={(e) => setProduct_en_name(e.target.value)}
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
                        onChange={(event, product_ar_desc) => {
                          setProduct_ar_desc(product_ar_desc.getData());
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
                        onChange={(event, product_en_desc) => {
                          setProduct_en_desc(product_en_desc.getData());
                        }}
                        required
                        editor={ClassicEditor}
                        placeholder="product description in English"
                        data={product_en_desc}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CLabel col md={3}>
                      product image
                    </CLabel>
                    <CCol xs="12" md="9">
                      <CInputFile
                        size="sm"
                        accept="image/*"
                        required
                        onChange={(e) => setImage_url(e.target.files[0])}
                        name="image_url"
                        custom
                        id="custom-file-input"
                      />
                      <CLabel htmlFor="custom-file-input" variant="custom-file">
                        select the product main image
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">product barcode</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        required
                        onChange={(e) => setProduct_barcode(e.target.value)}
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
                        onChange={(e) => setProduct_sku(e.target.value)}
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
                        onChange={(e) => setModel_number(e.target.value)}
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
                          setQuantity(e.target.value);
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
                          setZone(e.target.value);
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
                          setStand(e.target.value);
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
                    !image_url ||
                    !product_barcode ||
                    !product_sku ||
                    !model_number ||
                    !quantity ||
                    !zone ||
                    !stand
                  }
                  style={{ borderColor: "#ee8332", color: "#ee8332" }}
                  onClick={formSubmit}
                  type="button"
                  variant="outline"
                  size="lg"
                >
                  Add
                  <i className="fas fa-plus" style={{ marginLeft: "1em" }}></i>
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </Modal>

      <CRow>
        {products.map((product) => (
          <CCol key={product.id} xs="12" sm="6" md="3" lg="2">
            <CCard>
              <CCardHeader style={{ color: "#ee8332" }}>
                <span style={{ color: "black" }}>
                  {product.product_en_name}
                </span>
                <div className="card-header-actions">
                  <CLink className="card-header-action">
                    <CIcon name="cil-list" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCardBody>
                <div style={{ margin: "auto", textAlign: "center" }}>
                  <Image
                    height={150}
                    width={150}
                    src={process.env.REACT_APP_BACKEND_URL + product.image_url}
                    alt=""
                    fluid
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
};

export default Dashboard;
