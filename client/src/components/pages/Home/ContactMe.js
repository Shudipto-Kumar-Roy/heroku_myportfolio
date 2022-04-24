import "./ContactMe.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../../images/logo.png";
import { feedbackCreate } from "../../../api";
import { toast } from "react-toastify";
import validator from "email-validator"; // For email validation
import { validateFeedback } from "../../InputFieldValidation/formvalidation";
const ContactMe = () => {
  // For feedback state
  const [feedbackState, setFeedbackState] = useState({
    feedbackname: "",
    feedbackemail: "",
    feedback: "",
  });

  // For onchange input
  const handleInput = (event) => {
    setFeedbackState({
      ...feedbackState,
      [event.target.name]: event.target.value,
    });
  };

  // For create feedback
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateFeedback(feedbackState);
    if (isValid) {
      const res = await feedbackCreate(feedbackState); // api call
      if (res.status === 201) {
        toast.success("Feedback Sent Successfully to admin");
        setFeedbackState({
          feedbackname: "",
          feedbackemail: "",
          feedback: "",
        });
      }
    }
  };
  return (
    <>
      <section id="contact_id">
        <Container>
          <Row>
            <h1 className="contact_heading text-center">Contact Me</h1>
            <Col md={4} xs={10} className="contact_col_left mx-auto">
              <img src={logo} alt="Contact Logo" />
              <p>
                A responsive design makes your websites accessible to all users,
                regardless of their device.
              </p>
            </Col>
            <Col md={4} xs={10} className="contact_col_middle mx-auto">
              <h4>
                <a href="https://example.com">Website : Example.com</a>
              </h4>
              <h4>
                <a href="https://facebook.com">Facebook : Facebook.com</a>
              </h4>
              <h4>
                <a href="mailto:shudipto345@gmail.com">
                  Email : shudipto345@gmail.com
                </a>
              </h4>
              <h4>
                <a href="tel:+8801637205557">Phone : +880163720557</a>
              </h4>
            </Col>
            <Col md={4} xs={10} className="contact_col_right mx-auto">
              <div className="feedback_form">
                <form action="">
                  <div className="form_group">
                    <label htmlFor="name"></label>
                    <input
                      type="text"
                      name="feedbackname"
                      id="name"
                      value={feedbackState.feedbackname}
                      onChange={handleInput}
                      className="form_control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="email"></label>
                    <input
                      type="text"
                      name="feedbackemail"
                      id="email"
                      value={feedbackState.feedbackemail}
                      onChange={handleInput}
                      placeholder="Email"
                      className="form_control"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="feedback"></label>
                    <textarea
                      type="text"
                      name="feedback"
                      id="feedback"
                      value={feedbackState.feedback}
                      onChange={handleInput}
                      className="form_control"
                      placeholder="Write your feedback here"
                    ></textarea>
                  </div>
                  <div className="form_group">
                    <button type="button" onClick={handleClick}>
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactMe;
