import { useFormik } from "formik";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { loginSchema, registerSchema } from "../../schemas";
import { MdOutlineMailOutline, MdPersonOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeOffLine, RiGoogleFill } from "react-icons/ri";
import { auth, signInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword, logInWithEmailAndPassword } from "../../utils/firebase";

const Modals = (props) => {
  const [passLogin, setPassLog] = useState(false);
  const [passReg, setPassReg] = useState(false);

  const { handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
  });

  const responseGoogle = () => {
    // dispatch(loginGoogle({ loginHandle: props.loginHandleClose, getProfile: props.getDataGoogle }));
    signInWithGoogle({ loginHandle: props.loginHandleClose, getProfile: props.getDataGoogle });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (type === "login") {
      // dispatch(loginUser(payload));
      logInWithEmailAndPassword(values.email, values.password);
      props.loginHandleClose();
    }
    if (type === "register") {
      // let payload = {
      //   name: register.values.name,
      //   email: register.values.email,
      //   password: register.values.password,
      // };

      registerWithEmailAndPassword(register.values.name, register.values.email, register.values.password);
      // dispatch(regUser(payload));
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
              <div className="buttons-modal flex align-center mt-3">
                <button className="button-login rounded-3xl px-6 py-2" type="submit">
                  Login
                </button>
                <button className="button-login rounded-3xl px-6 py-2 flex items-center" type="button" onClick={responseGoogle}>
                  <RiGoogleFill className="mr-2" />
                  Login With Google
                </button>
              </div>
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
                      className={`py-2 px-3  rounded-3xl ${register.errors.name && register.touched.name ? "input-error" : ""}`}
                      onBlur={register.handleBlur}
                      name="name"
                      placeholder="Name"
                      value={register.values.name}
                      onChange={register.handleChange}
                    />
                    <MdPersonOutline className="absolute icon" />
                  </span>
                  {register.errors.name && register.touched.name && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.name}</p>}
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
