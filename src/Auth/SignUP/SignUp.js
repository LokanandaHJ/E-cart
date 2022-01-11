import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name is too short"),
  confirmPassword: Yup.string()
    .required("password is required")
    .test("passwords-match", "Passwords must match", function(value) {
      return this.parent.password === value;
    }),
});

const SignUp = () => {
  // const [UserInput,SetUserInput] = useState({});

  //const [Input,SetInput] = useState({});

  // const EventchangeHandler = (event) =>{

  //   const {name,value} = event.target;
  //       console.log(event)
  //       SetUserInput(
  //       {
  //           ...UserInput,
  //           [name]:value,
  //       })
  // };

  const formsubmitHandler = (event) => {
    // event.preventDefault();
    console.log(event);

    const headers = {
      method: "Post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
    };
    fetch("https://vast-forest-59040.herokuapp.com/signup", headers)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        role: "",
        name: "",
        confirmPassword: "",
      }}
      onSubmit={formsubmitHandler}
      validationSchema={RegisterSchema}
    >
      {({ errors, touched, isValid }) => {
        return (
          <Form>
            <div>
              <div className="parentcard">
                <div className="childcard">
                  <div className="reg">
                    <h2>Create Account</h2>
                  </div>

                  <div className="col">
                    <label className="req-label">Username</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                    {touched.name && errors.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </div>

                  <div className="col">
                    <label className="req-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your mail"
                      autoComplete="off"
                    />
                    {touched.email && errors.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="col">
                    <label className="req-label">Password</label>
                    <Field type="password" name="password" />
                    {touched.password && errors.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="col">
                    <label className="req-label">Confirm password</label>
                    <Field type="password" name="confirmPassword" />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div>{errors.confirmPassword}</div>
                    ) : null}
                  </div>

                  <div className="col">
                    <label className="req-label">Roles:</label>
                    <Field as="select" name="role">
                      <option isdisabled="true">select user type</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </Field>
                    {touched.role && errors.role ? (
                      <div>{errors.role}</div>
                    ) : null}
                  </div>

                  <div className="col">
                    <button type="reset">cancel</button>
                    <Link to="/Login">
                      <button type="submit" className="loginbutton">
                        Submit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
