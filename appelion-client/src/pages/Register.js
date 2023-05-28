import { Form, Input } from "antd";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import "./Register.css";
import MainLogo from "../logo1.png";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onFinish = async (values) => {
    // console.log(values);
    const {
      firstname,
      lastname,
      username,
      mobileNumber,
      whatsappNumber,
      email,
      password,
      confirmPassword,
    } = values;

    if (!firstname || !firstname.trim()) {
      return toast.error("First Name cannot be empty");
    }
    if (!lastname || !lastname.trim()) {
      return toast.error("Last Name cannot be empty");
    }

    if (!username || !username.trim()) {
      return toast.error("Username cannot be empty");
    }
    if (!email || !email.trim()) {
      return toast.error("Email cannot be empty");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format");
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      return toast.error("Mobile number cannot be empty");
    }

    const mobileNumberRegex = /^[6-9]\d{9}$/;

    if (!mobileNumberRegex.test(mobileNumber)) {
      return toast.error("Invalid mobile number");
    }

    if (!whatsappNumber || !whatsappNumber.trim()) {
      return toast.error("WhatsApp number cannot be empty");
    }

    if (!mobileNumberRegex.test(whatsappNumber)) {
      return toast.error("Invalid Indian Whatsapp number");
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters long");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match ");
    }

    try {
      dispatch(showLoading());
      const token = captchaRef.current.getValue();
      if (!token) {
        dispatch(hideLoading());
        captchaRef.current.reset();
        return toast.error("Please verify that you are not a robot");
      }
      values.token = token;
      delete values.confirmPassword;
      const response = await axios.post(
        "http://34.131.197.1/api/user/register",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
      captchaRef.current.reset();
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="register-page-container">
        <div className="register-page-inside-container">
          <div className="register-page-main-container">
            <div className="register-page-main-part-container">
              <div className="register-page-data">
                <div>
                  <img
                    src={MainLogo}
                    alt="logo"
                    width={"100px"}
                    height={"100px"}
                  />
                </div>
                <div className="greeting-message">Nice To Meet You</div>
                <Form layout="vertical" onFinish={onFinish}>
                  <div className="register-form-first-container">
                    <Form.Item
                      style={{
                        minWidth: "300px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      label="First Name"
                      name="firstname"
                    >
                      <Input placeholder="First Name" type="text" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        minWidth: "300px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      label="Last Name"
                      name="lastname"
                    >
                      <Input placeholder="Last Name" type="text" />
                    </Form.Item>
                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="Username"
                      name="username"
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="Email"
                      name="email"
                    >
                      <Input placeholder="Email" type="text" />
                    </Form.Item>
                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="MobileNumber"
                      name="mobileNumber"
                    >
                      <Input placeholder="MobileNumber" type="number" />
                    </Form.Item>
                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="WhatsappNumber"
                      name="whatsappNumber"
                    >
                      <Input placeholder="WhatsappNumber" type="number" />
                    </Form.Item>
                  </div>
                  <hr
                    style={{ width: "100%", borderBottom: "1px solid black" }}
                  />
                  <div className="register-form-second-container">
                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="Password"
                      name="password"
                    >
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ minWidth: "300px" }}
                      label="ConfirmPassword"
                      name="confirmPassword"
                    >
                      <Input placeholder="ConfirmPassword" type="password" />
                    </Form.Item>
                    <ReCAPTCHA
                      style={{ marginTop: "10px" }}
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      ref={captchaRef}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <button className="register-page-button" type="submit">
                      REGISTER
                    </button>
                  </div>

                  <Link to="/login" className="link-for-login">
                    <span> Already have an account ?</span>
                    <span> Login here</span>
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
