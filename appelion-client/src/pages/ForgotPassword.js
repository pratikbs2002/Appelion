import { Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import "./Register.css";
import "./ForgotPassword.css";
import MainLogo from "../logo1.png";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://34.131.197.1/api/user/send-forgot-password-email",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <div className="forgot-password-container">
    <div className="forgot-password-inside-container">
      <div className="forgot-password-main-container">
        <div>
          <img src={MainLogo} alt="logo" width={"100px"} height={"100px"} />
        </div>
        <div className="forgot-password-text">Forgot Password</div>
        <div className="forgot-password-text-message">
          Just type your email, we will send you email to reset your
          password
        </div>
        <div className="forgot-password-card">
          <Form
            style={{ display: "flex", flexDirection: "column" }}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email : "
              name="email"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                columnGap: "10px",
              }}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <button
              className="forgot-password-register-button"
              htmltype="submit"
            >
              Send Link to Email
            </button>
            <Link to="/login" className="forgot-password-link-for-login">
              <span> Remember Your Password ?</span>
              <span> Login here</span>
            </Link>
          </Form>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}
