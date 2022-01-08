import React from "react";
import { Formik, Form, Field } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AddSchema = Yup.object({
  ratings: Yup.number()
    .min(1, "Must be greater than 1")
    .max(5, "Must be lower than 5")
    .required("Please eneter any value"),

  name: Yup.string().required("Enter a valid name"),
});

const AddProducts = (props) => {
  const getID = useParams();

  const [Values, setValues] = useState({
    name: "",
    price: "",
    size: "",
    imageName: "",
    ratings: "",
    discount: "",
  });

  useEffect(() => {
    Axios.get(`/products/${getID.id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [getID.id]);

  const [loader, setLoader] = useState(false);

  const addHandler = (addingData, { resetForm }) => {
    if (getID.id) {
      editData(addingData);
      resetForm();
    } else {
      addData(addingData);
      resetForm();
    }
    // resetForm;
  };
  const addData = (addingData) =>
    Axios.post("/products", addingData)
      .then((res) => {
        setLoader("true");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  // setLoader("false");

  const editData = (addingData) =>
    Axios.patch(`/products/${getID.id}`, addingData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  return (
    <Formik
      initialValues={Values}
      validationSchema={AddSchema}
      onSubmit={addHandler}
      enableReinitialize
    >
      {({ errors, touched, isValid }) => {
        console.log(errors, touched, isValid);
        return (
          <Form>
            <div className="row g-3">
              <div className="form-label">
                <h2>Add Product Form</h2>
              </div>
            </div>
            <div className="row g-3">
              <label className="form-label">Product Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter product name"
                autoComplete="off"
              />
              {touched.name && errors.name ? <div>{errors.name}</div> : null}
            </div>
            <div className="row g-3">
              <label className="form-label">Price</label>
              <Field
                type="number"
                name="price"
                placeholder="Enter product price"
                autoComplete="off"
              />
            </div>
            <div className="row g-3">
              <label className="form-label">Size</label>
              <Field
                type="Number"
                name="size"
                placeholder="Enter product Size"
                autoComplete="off"
              />
            </div>
            <div className="row g-3">
              <label className="form-label">Image Name</label>
              <Field
                type="text"
                name="imageName"
                placeholder="Enter Image name"
                autoComplete="off"
              />
            </div>
            <div className="row g-3">
              <label className="form-label">Product ratings</label>
              <Field
                type="number"
                name="ratings"
                placeholder="Enter ratings"
                autoComplete="off"
              />
              {touched.ratings && errors.ratings ? (
                <div>{errors.ratings}</div>
              ) : null}
            </div>
            <div className="row g-3">
              <label className="form-label">Discount</label>
              <Field
                type="text"
                name="discount"
                placeholder="Enter Discount here"
                autoComplete="off"
              />
            </div>
            <div className="col">
              <button type="reset">Cancel</button>
              <button
                type="submit"
                className="loginbutton"
                disabled={!isValid || loader}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProducts;
