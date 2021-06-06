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
import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createProduct } from "../actions/products-action";

export function NewProductForm({ openModal, closeModal }) {
  const [_en_name, setProduct_en_name] = useState("");
  const [_en_desc, setProduct_en_desc] = useState("");
  const [image_url, setImage_url] = useState();
  const [_barcode, setProduct_barcode] = useState("");
  const [_sku, setProduct_sku] = useState("");
  const [productModel_number, setModel_number] = useState("");

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_en_name", _en_name);
    formData.append("product_en_desc", _en_desc);
    formData.append("image_url", image_url);
    formData.append("product_barcode", _barcode);
    formData.append("product_sku", _sku);
    formData.append("model_number", productModel_number);
    if (_en_name && _en_desc && _barcode && _sku && productModel_number) {
      dispatch(createProduct(formData));
    } else {
      alert("Please Fill All Fields");
    }
  };

  return (
    <Fragment>
      <Modal
        open={openModal}
        onClose={closeModal}
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
                        onChange={(e) => setProduct_en_name(e.target.value)}
                        required
                        type="text"
                        value={_en_name}
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
                        onChange={(event, _en_desc) => {
                          setProduct_en_desc(_en_desc.getData());
                        }}
                        required
                        editor={ClassicEditor}
                        placeholder="product description in English"
                        data={_en_desc}
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
                        value={_barcode}
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
                        value={_sku}
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
                        value={productModel_number}
                        placeholder="Model Number"
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter style={{ textAlign: "center" }}>
                <CButton
                  disabled={
                    !_en_name ||
                    !_en_desc ||
                    !image_url ||
                    !_barcode ||
                    !_sku ||
                    !productModel_number
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
    </Fragment>
  );
}
