import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { loginSchema, registerSchema } from "../../schemas";

const Modals = (props) => {
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
  const handleSubmit = async (e, type) => {
    if (type === "login") {
      try {
        e.preventDefault();
        let payload = {
          email: values.email,
          password: values.password,
        };
        const data = await axios.post("http://notflixtv.herokuapp.com/api/v1/users/login", payload);
        localStorage.setItem("datas", JSON.stringify(data.data.data.token));
        console.log(payload);

        props.loginHandleClose();
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "register") {
      try {
        e.preventDefault();
        let payload = {
          first_name: register.values.firstName,
          last_name: register.values.lastName,
          email: register.values.email,
          password: register.values.password,
          password_confirmation: register.values.passConf,
        };
        const data = await axios.post("http://notflixtv.herokuapp.com/api/v1/users", payload);
        console.log(data);

        props.registerHandleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (props.log) {
    return (
      <div>
        <Modal show={props.log} onHide={props.loginHandleClose}>
          <Modal.Header>
            <Modal.Title>
              <h1 className="mx-3 text-xl">Login</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="" onSubmit={(e) => handleSubmit(e, "login")}>
              <div className="relative flex flex-col gap-y-5 justify-center content-center my-2">
                <div className="grouping-input flex flex-col mx-3">
                  <input name="email" onBlur={handleBlur} className={`py-2 pl-5  rounded-3xl ${errors.email && touched.email ? "input-error" : ""}`} placeholder="Email Address" value={values.email} onChange={handleChange} />
                  {errors.email && touched.email && <p className="error text-sm text-red-600 mt-1 ml-4">{errors.email}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="Password"
                    onBlur={handleBlur}
                    name="password"
                    className={`py-2 pl-5   rounded-3xl ${errors.password && touched.password ? "input-error" : ""}`}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && <p className="error text-sm text-red-600 mt-1 ml-4">{errors.password}</p>}
                </div>
              </div>
              <button className="button-login rounded-3xl px-6 py-2 mt-3">Login</button>
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
          <Modal.Header>
            <Modal.Title>
              <h1 className="mx-3 text-xl">Create Account</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="" onSubmit={(e) => handleSubmit(e, "register")}>
              <div className="wrapping relative flex flex-col gap-y-5 justify-center content-center my-2">
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="text"
                    className={`py-2 pl-5 rounded-3xl ${register.errors.firstName && register.touched.firstName ? "input-error" : ""}`}
                    onBlur={register.handleBlur}
                    name="firstName"
                    placeholder="First Name"
                    value={register.values.firstName}
                    onChange={register.handleChange}
                  />
                  {register.errors.firstName && register.touched.firstName && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.firstName}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="text"
                    onBlur={register.handleBlur}
                    className={`py-2 pl-5 rounded-3xl ${register.errors.lastName && register.touched.lastName ? "input-error" : ""}`}
                    name="lastName"
                    placeholder="Last Name"
                    value={register.values.lastName}
                    onChange={register.handleChange}
                  />
                  {register.errors.lastName && register.touched.lastName && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.lastName}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="email"
                    onBlur={register.handleBlur}
                    name="email"
                    className={`py-2 pl-5   rounded-3xl ${register.errors.email && register.touched.email ? "input-error" : ""}`}
                    placeholder="Email"
                    value={register.values.email}
                    onChange={handleChange}
                  />
                  {register.errors.email && register.touched.email && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.email}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="Password"
                    onBlur={register.handleBlur}
                    name="password"
                    className={`py-2 pl-5   rounded-3xl ${register.errors.password && register.touched.password ? "input-error" : ""}`}
                    placeholder="Password"
                    value={register.values.password}
                    onChange={handleChange}
                  />
                  {register.errors.password && register.touched.password && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.password}</p>}
                </div>
                <div className="grouping-input flex flex-col mx-3">
                  <input
                    type="Password"
                    onBlur={register.handleBlur}
                    className={`py-2 pl-5 rounded-3xl ${register.errors.passConf && register.touched.passConf ? "input-error" : ""}`}
                    name="passConf"
                    placeholder="Password Confirmation"
                    value={register.values.passConf}
                    onChange={register.handleChange}
                  />
                  {register.errors.passConf && register.touched.passConf && <p className="error text-sm text-red-600 mt-1 ml-4">{register.errors.passConf}</p>}
                </div>

                {/* <input type="text" className="py-2 pl-5 mx-3  rounded-3xl " name="firstName" placeholder="First Name" value={register.values.firstName} onChange={register.handleChange} />
                <input type="text" className="py-2 pl-5 mx-3 rounded-3xl " name="lastName" placeholder="Last Name" value={register.values.lastName} onChange={register.handleChange} />
                <input type="email" className="py-2 pl-5 mx-3  rounded-3xl " name="email" placeholder="Email Address" value={register.values.email} onChange={register.handleChange} />
                <input type="Password" className="py-2 pl-5 mx-3 rounded-3xl " name="password" placeholder="Password" value={register.values.password} onChange={register.handleChange} />
                <input type="Password" className="py-2 pl-5 mx-3 rounded-3xl " name="passConf" placeholder="Password Confirmation" value={register.values.passConf} onChange={register.handleChange} /> */}
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
