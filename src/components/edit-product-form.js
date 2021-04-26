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
  CSelect,
} from "@coreui/react";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createProduct, UpdateProduct } from "../actions/products-action";

export function EditProductForm({ openModal, closeModal }) {
  const [product_en_name, setEditedProduct_en_name] = useState();
  const [product_en_desc, setEditedProduct_en_desc] = useState();
  const [product_barcode, setEditedProduct_barcode] = useState();
  const [product_sku, setEditedProduct_sku] = useState();
  const [model_number, setEditedModel_number] = useState();

  const editForm = (e) => {
    if (
      product_en_name &&
      product_en_desc &&
      product_barcode &&
      product_sku &&
      model_number
    ) {
      // dispatch(
      //   UpdateProduct(productDetail.id, {
      //     product_en_name,
      //     product_en_desc,
      //     product_barcode,
      //     product_sku,
      //     model_number,
      //   })
      // );
    } else {
      alert("Please Fill All Fields");
    }
  };

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_en_name", product_en_name);
    formData.append("product_en_desc", product_en_desc);
    formData.append("product_barcode", product_barcode);
    formData.append("product_sku", product_sku);
    formData.append("model_number", model_number);
    if (
      product_en_name &&
      product_en_desc &&
      product_barcode &&
      product_sku &&
      model_number
    ) {
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
                </CForm>
              </CCardBody>
              <CCardFooter style={{ textAlign: "center" }}>
                <CButton
                  disabled={
                    !product_en_name ||
                    !product_en_desc ||
                    !product_barcode ||
                    !product_sku ||
                    !model_number
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
    </Fragment>
  );
}
