import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
} from "@coreui/react";
import { NewProductForm } from "../components/new-product-form";
import { EditProductForm } from "../components/edit-product-form";
// import { DeleteFrom } from "../../components/delete-form";
import { InfoModal } from "../components/info-modal";
import { LocationForm } from "../components/location-form";
const Products = ({ history }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [danger, setDanger] = useState(false);
  const [info, setInfo] = useState(false);
  const [locationForm, setLocationForm] = useState(false);
  const [productDetail, setProductDetail] = useState("");
  const productCreate = useSelector((state) => state.productCreate);
  const { success } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: updateSuccess } = productUpdate;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: deleteSuccess } = productDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
  const location = useSelector((state) => state.addLocation);
  const { success: locationAddSuccess } = location;

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success || updateSuccess) {
      setOpenModal(false);
      setOpenEditModal(false);
    }

    // if (deleteSuccess) {
    //   setDanger(false);
    // }
    if (locationAddSuccess) {
      setLocationForm(false);
    }
  }, [
    deleteSuccess,
    history,
    locationAddSuccess,
    success,
    updateSuccess,
    userInfo,
  ]);
  return (
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
          <CCol key={product.id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="2">
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
                          onClick={() => {
                            setLocationForm(!locationForm);
                            setProductDetail(product);
                          }}
                        >
                          <i
                            className="fas fa-map-marker"
                            style={{ padding: ".5rem" }}
                          ></i>{" "}
                          Add To Zone
                        </p>
                        <p
                          style={{ margin: "0", padding: "14px" }}
                          onMouseEnter={() => {
                            setProductDetail(product);
                          }}
                          onClick={() => {
                            onOpenEditModal();
                          }}
                        >
                          <i
                            className="fas fa-edit"
                            style={{ padding: ".5rem" }}
                          ></i>{" "}
                          Edit
                        </p>
                        {/* <p
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
                        </p> */}
                      </div>
                    </div>
                  )}
              </CCardHeader>
              <CCardBody>
                <div
                  style={{ margin: "auto", textAlign: "center" }}
                  className={styles.image_dropdown}
                >
                  <LazyLoadImage
                    height={150}
                    width={150}
                    src={product.image_url}
                    alt={product.image_url}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
      {/* <DeleteFrom
        modalShow={danger}
        modalClose={() => setDanger(false)}
        productDetail={productDetail}
      /> */}
      <InfoModal
        modalShow={info}
        modalClose={() => setInfo(false)}
        productDetail={productDetail}
      />
      <EditProductForm
        openModal={openEditModal}
        closeModal={onCloseEditModal}
        productDetail={productDetail}
      />
      <LocationForm
        modalShow={locationForm}
        modalClose={() => setLocationForm(false)}
        productDetail={productDetail}
      />
    </>
  );
};
export default Products;
