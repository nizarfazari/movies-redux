import { useFormik } from "formik";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { loginSchema, registerSchema } from "../../schemas";
import { MdOutlineMailOutline, MdPersonOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

import { loginGoogle, loginUser, regUser } from "../../app/feature/users";

const Modals = (props) => {
  const [passLogin, setPassLog] = useState(false);
  const [passReg, setPassReg] = useState(false);
  const [passConf, setPassConf] = useState(false);
  const dispatch = useDispatch();

  const { handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const register = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passConf: "",
    },
    validationSchema: registerSchema,
  });

  const responseGoogle = (response) => {
    dispatch(loginGoogle(response));
    props.loginHandleClose();
    props.getDataGoogle();
  };

  const handleSubmit = async (e, type) => {
    if (type === "login") {
      e.preventDefault();
      let payload = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginUser(payload));
      props.loginHandleClose();
    }
    if (type === "register") {
      e.preventDefault();
      let payload = {
        first_name: register.values.firstName,
        last_name: register.values.lastName,
        email: register.values.email,
        password: register.values.password,
        password_confirmation: register.values.passConf,
      };
      dispatch(regUser(payload));
      props.registerHandleClose();
    }
  };

  if (props.log) {
    return (
      <div>
        <Modal show={props.log} onHide={props.loginHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1 className="mx-3 text-xl">Login</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="" onSubmit={(e) => handleSubmit(e, "login")}>
              <div className="relative flex flex-col gap-y-5 justify-center content-center my-2">
                <div className="grouping-input flex flex-col mx-3">
                  <span className="relative">
                    <input name="email" onBlur={handleBlur} className={`py-2 px-3  rounded-3xl ${errors.email && touched.email ? "input-error" : ""}`} placeholder="Email Address" value={values.email} onChange={handleChange} />
                    <MdOutlineMailOutline className="absolute icon" />
                  </span>
                  {errors.email && touched.email && <p className="error text-sm text-red-600 mt-1 ml-4">{errors.email}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  {passLogin ? (
                    <span className="relative">
                      <input
                        type="text"
                        onBlur={handleBlur}
                        name="password"
                        className={`py-2 px-3    rounded-3xl ${errors.password && touched.password ? "input-error" : ""}`}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <MdOutlineRemoveRedEye className="absolute icon cursor-pointer" onClick={() => setPassLog(!passLogin)} />
                    </span>
                  ) : (
                    <span className="relative">
                      <input
                        type="Password"
                        onBlur={handleBlur}
                        name="password"
                        className={`py-2 px-3    rounded-3xl ${errors.password && touched.password ? "input-error" : ""}`}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <RiEyeOffLine className="absolute icon cursor-pointer" onClick={() => setPassLog(!passLogin)} />
                    </span>
                  )}
                  {errors.password && touched.password && <p className="error text-sm text-red-600 mt-1 ml-4">{errors.password}</p>}
                </div>
              </div>
              <GoogleOAuthProvider clientId="376587108230-nv528gnfio7b42i0l1h4idnj24o2v6eb.apps.googleusercontent.com">
                <div className="buttons-modal flex align-center mt-3">
                  <button className="button-login rounded-3xl px-6 py-2 ">Login</button>
                  <div className="button-google ml-3">
                    <GoogleLogin
                      onSuccess={responseGoogle}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                </div>
              </GoogleOAuthProvider>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  if (props.reg) {
    return (
      <div>
        <Modal show={props.reg} onHide={props.registerHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1 className="mx-3 text-xl">Create Account</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="" onSubmit={(e) => handleSubmit(e, "register")}>
              <div className="wrapping relative flex flex-col gap-y-5 justify-center content-center my-2">
                <div className="grouping-input flex flex-col mx-3">
                  <span className="relative">
                    <input
                      type="text"
                      className={`py-2 px-3  rounded-3xl ${register.errors.firstName && register.touched.firstName ? "input-error" : ""}`}
                      onBlur={register.handleBlur}
                      name="firstName"
                      placeholder="First Name"
                      value={register.values.firstName}
                      onChange={register.handleChange}
                    />
                    <MdPersonOutline className="absolute icon" />
                  </span>
                  {register.errors.firstName && register.touched.firstName && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.firstName}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <span className="relative">
                    <input
                      type="text"
                      onBlur={register.handleBlur}
                      className={`py-2 px-3 rounded-3xl ${register.errors.lastName && register.touched.lastName ? "input-error" : ""}`}
                      name="lastName"
                      placeholder="Last Name"
                      value={register.values.lastName}
                      onChange={register.handleChange}
                    />
                    <MdPersonOutline className="absolute icon" />
                  </span>
                  {register.errors.lastName && register.touched.lastName && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.lastName}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <span className="relative">
                    <input
                      onBlur={register.handleBlur}
                      name="email"
                      className={`py-2 px-3 rounded-3xl ${register.errors.email && register.touched.email ? "input-error" : ""}`}
                      placeholder="Email"
                      value={register.values.email}
                      onChange={register.handleChange}
                    />
                    <MdOutlineMailOutline className="absolute icon" />
                  </span>
                  {register.errors.email && register.touched.email && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.email}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  {passReg ? (
                    <span className="relative">
                      <input
                        type="text"
                        onBlur={register.handleBlur}
                        name="password"
                        className={`py-2 px-3    rounded-3xl ${register.errors.password && register.touched.password ? "input-error" : ""}`}
                        placeholder="Password"
                        value={register.values.password}
                        onChange={register.handleChange}
                      />
                      <MdOutlineRemoveRedEye className="absolute icon cursor-pointer" onClick={() => setPassReg(!passReg)} />
                    </span>
                  ) : (
                    <span className="relative">
                      <input
                        type="Password"
                        onBlur={register.handleBlur}
                        name="password"
                        className={`py-2 px-3    rounded-3xl ${register.errors.password && register.touched.password ? "input-error" : ""}`}
                        placeholder="Password"
                        value={register.values.password}
                        onChange={register.handleChange}
                      />
                      <RiEyeOffLine className="absolute icon cursor-pointer" onClick={() => setPassReg(!passReg)} />
                    </span>
                  )}
                  {register.errors.password && register.touched.password && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.password}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  {passConf ? (
                    <span className="relative">
                      <input
                        type="text"
                        onBlur={register.handleBlur}
                        className={`py-2 px-3  rounded-3xl ${register.errors.passConf && register.touched.passConf ? "input-error" : ""}`}
                        name="passConf"
                        placeholder="Password Confirmation"
                        value={register.values.passConf}
                        onChange={register.handleChange}
                      />

                      <MdOutlineRemoveRedEye className="absolute icon cursor-pointer" onClick={() => setPassConf(!passConf)} />
                    </span>
                  ) : (
                    <span className="relative">
                      <input
                        type="Password"
                        onBlur={register.handleBlur}
                        className={`py-2 px-3  rounded-3xl ${register.errors.passConf && register.touched.passConf ? "input-error" : ""}`}
                        name="passConf"
                        placeholder="Password Confirmation"
                        value={register.values.passConf}
                        onChange={register.handleChange}
                      />

                      <RiEyeOffLine className="absolute icon cursor-pointer" onClick={() => setPassConf(!passConf)} />
                    </span>
                  )}

                  {register.errors.passConf && register.touched.passConf && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.passConf}</p>}
                </div>
              </div>
              <button className="button-login rounded-3xl px-6 py-2 mt-3">Register Now</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default Modals;
