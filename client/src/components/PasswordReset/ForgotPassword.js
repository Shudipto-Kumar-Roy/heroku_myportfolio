import axios from "axios";
import React, { useState } from "react";
import validator from "email-validator";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../InputFieldValidation/formvalidation";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // for path location
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateEmail(email);
    if (isValid) {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        toast.success(`Email sent to ${email} successfully`);
        navigate("/");
      }
    }
  };
  return (
    <>
      <Container className="maincontainer">
        <Row>
          <Col md={12} className="text-center">
            <form action="">
              <div className="formContainer">
                <div className="forgotpasswordGroup">
                  <h3 className="forgotpasswordHeading">Password Recovery</h3>
                </div>
                <div className="forgotpasswordGroup">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for reset your password"
                    className="forgotpasswordControl"
                  />
                </div>
                <div className="forgotpasswordGroup">
                  <button
                    onClick={handleClick}
                    className="forgotpasswordButton"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
