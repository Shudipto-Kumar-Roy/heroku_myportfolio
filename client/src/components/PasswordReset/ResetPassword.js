import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { validateResetFields } from "../InputFieldValidation/formvalidation";
import { resetPassword } from "../../api";

const ResetPassword = () => {
  const [resetstate, setResetState] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // for location path
  const { token } = useParams(); // for getting url token

  // For reset password
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateResetFields(resetstate);
    if (isValid) {
      const res = await resetPassword(resetstate, token);
      if (res.status === 200) {
        toast.success(`Password Reset successfully`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }
    }
  };

  // For onchange input
  const handleInput = async (event) => {
    setResetState({ ...resetstate, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Container className="maincontainer">
        <Row>
          <Col md={12} className="text-center">
            <form action="">
              <div className="formContainer">
                <div className="resetpasswordGroup">
                  <h3 className="resetpasswordHeading">Password Reset</h3>
                </div>
                <div className="resetpasswordGroup">
                  <input
                    type="password"
                    name="password"
                    value={resetstate.password}
                    onChange={handleInput}
                    placeholder="Password"
                    className="resetpasswordControl"
                  />
                </div>
                <div className="resetpasswordGroup">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={resetstate.confirmPassword}
                    onChange={handleInput}
                    placeholder="Confirm Password"
                    className="resetpasswordControl"
                  />
                </div>
                <div className="resetpasswordGroup">
                  <button onClick={handleClick} className="resetpasswordButton">
                    Reset
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

export default ResetPassword;
