import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/products-action";
import { Modal } from "react-responsive-modal";
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
  CRow,
} from "@coreui/react";

const Dashboard = ({ match, history }) => {
  const [openModal1, setOpenModal1] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success } = productCreate;

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
    formData.append("standId", match.params.id);

    if (
      product_ar_name &&
      product_en_name &&
      product_ar_desc &&
      product_en_desc &&
      image_url &&
      product_barcode &&
      product_sku
    ) {
      dispatch(createProduct(formData));
    } else {
      alert("يرجى تعبئة الحقول بالكامل");
    }
    console.log(formData);
  };

  const onOpenModal1 = () => setOpenModal1(true);
  const onCloseModal1 = () => setOpenModal1(false);

  // useEffect(() => {
  //   if (success || successColor) {
  //     setOpenModal1(false);
  //     setProduct_ar_name("");
  //     setProduct_en_name("");
  //     setProduct_ar_desc("");
  //     setProduct_en_desc("");
  //     setImage_url("");
  //     setProduct_barcode("");
  //     setProduct_sku("");
  //   }
  // }, [history, zone]);

  return (
    <>
      <CButton
        style={{ float: "right" }}
        onClick={onOpenModal1}
        variant="outline"
        color="primary"
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
              <CCardHeader>Add Product</CCardHeader>
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
                        type="number"
                        value={product_sku}
                        placeholder="SKU Code"
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  onClick={formSubmit}
                  type="button"
                  size="md"
                  color="primary"
                >
                  Add
                  <i className="fas fa-plus" style={{ marginLeft: "1em" }}></i>
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </Modal>
    </>
  );
};

export default Dashboard;
