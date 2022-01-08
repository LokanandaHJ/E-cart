import React from "react";
import "./Login.css";
import "../Card.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import Axios from "axios";
import { USER } from "../../UTLS/Constants";
import { TOKEN } from "../../UTLS/Constants";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
});




const Login = () => {
  const navigate = useNavigate();

  const Loginsubmithandler = (loginData) =>{
   
  
    console.log(loginData)
  
    Axios.post("/login", loginData).then(res => {
      console.log(res) 
      localStorage.setItem(TOKEN,res.data.token)
      localStorage.setItem(USER,JSON.stringify(res.data.user));
      navigate('/Home');
    }
    )
    .catch(err => {
      console.log(err)
      
    })
  }


  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={Loginsubmithandler}
      validationSchema={LoginSchema}
    >
      {({ errors, touched, isValid }) => {
        return (
          <Form>
            <div>
              <div className="parentcardforlogin">
                <div className="childcardforlogin">
                  <div className="col">
                    <div className="col">
                      <label className="req-label">Mail ID</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter mail"
                        autoComplete="off"
                      />
                      {touched.email && errors.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="col">
                      <label className="req-label">Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                      {touched.password && errors.password ? (
                        <div>{errors.password}</div>
                      ) : null}
                    </div>

                    <button type="submit" className="loginbutton">
                      Login
                    </button>
                    <div className="regtext">
                      New user! <Link to={"/SignUp"}>Rigister here</Link>{" "}
                    </div>
                    {/* <button type="button" className="regbutton" onClick={routeChange}>
                   Rigister
            </button> */}
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

export default Login;
