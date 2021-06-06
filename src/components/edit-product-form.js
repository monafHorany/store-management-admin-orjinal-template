import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UpdateProduct } from "../actions/products-action";
export function EditProductForm({ openModal, closeModal, productDetail }) {
  const [product_en_name, setEditedProduct_en_name] = useState();
  const [product_en_desc, setEditedProduct_en_desc] = useState();
  const [product_barcode, setEditedProduct_barcode] = useState();
  const [product_sku, setEditedProduct_sku] = useState();
  const [model_number, setEditedModel_number] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setEditedProduct_en_name(productDetail.product_en_name);
    setEditedProduct_en_desc(productDetail.product_en_desc);
    setEditedProduct_barcode(productDetail.product_barcode);
    setEditedProduct_sku(productDetail.product_sku);
    setEditedModel_number(productDetail.model_number);
  }, [
    productDetail.model_number,
    productDetail.product_barcode,
    productDetail.product_en_desc,
    productDetail.product_en_name,
    productDetail.product_sku,
  ]);
  const editForm = () => {
    if (product_en_name) {
      dispatch(
        UpdateProduct(productDetail.id, {
          product_en_name,
          product_en_desc,
          product_barcode,
          product_sku,
          model_number,
        })
      );
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
                  disabled={!product_en_name}
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
