import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import styles from "./stand.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import { listProductsByStandId } from "../actions/products-action";
import { InfoModal } from "../components/info-modal";
import { EditProductForm } from "../components/edit-product-form";
// import { DeleteFrom } from "../components/delete-form";
import { LocationForm } from "../components/location-form";
const StandDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const standProduct = useSelector((state) => state.standProduct);
  const { loading, standProducts } = standProduct;

  // const [danger, setDanger] = useState(false);

  const [info, setInfo] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [locationForm, setLocationForm] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);
  const id = match.params.id;
  useEffect(() => {
    dispatch(listProductsByStandId(id));
  }, [dispatch, id]);
  return (
    <>
      {!loading && (
        <>
          <CRow>
            {standProducts.products.map((product) => (
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
                      <div className={styles.image_dropdown_content}>
                        <Image
                          height={400}
                          width={400}
                          src={product.image_url}
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
      {/* 
      <DeleteFrom
        modalShow={danger}
        modalClose={() => setDanger(false)}
        productDetail={productDetail}
      /> */}
      <LocationForm
        modalShow={locationForm}
        modalClose={() => setLocationForm(false)}
        productDetail={productDetail}
      />
    </>
  );
};

export default StandDetail;
