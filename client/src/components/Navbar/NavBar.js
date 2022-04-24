import React, { useState, useEffect } from "react";
import "./NavBar.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGem,
  FaHeart,
  FaHome,
  FaUserGraduate,
  FaUserPlus,
} from "react-icons/fa";
import { BiUserPin } from "react-icons/bi";
import {
  AiFillContacts,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import logo from "../../images/logo.png";
import { loginUser, logout, sigupUserApi } from "../../api";
import axios from "axios";
import { toast } from "react-toastify"; // for alert message
import {
  LoginValidate,
  SignUpValidate,
} from "../InputFieldValidation/formvalidation";

const NavBar = () => {
  const navigate = useNavigate(); // for path location

  // For navigation link
  const [navbarstate, setNavbarState] = useState({
    login: false,
    user: "",
  });
  const [signupshow, setSignupShow] = useState(false); // For signup modal
  const handleSignupClose = () => setSignupShow(false); // For signup modal
  const handleSignupShow = () => setSignupShow(true); // For signup modal

  const [loginshow, setLoginShow] = useState(false); // For login modal
  const handleLoginClose = () => setLoginShow(false); // For login modal
  const handleLoginShow = () => setLoginShow(true); // For login modal

  const [loginState, setLoginState] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [signupState, setSignUpState] = useState({
    signUpName: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpConfirmPassword: "",
  });

  // Onchange for login input field
  const handleLoginInput = (event) => {
    setLoginState({ ...loginState, [event.target.name]: event.target.value });
  };

  // For login click
  const handleLoginClick = async (event) => {
    event.preventDefault();

    const isValidate = LoginValidate(loginState); // Frontend Login field Validation
    if (isValidate) {
      const res = await loginUser(loginState); // api call
      if (res.status === 200) {
        toast.success("Login Successfully");
        setNavbarState({ ...navbarstate, login: true });
        setLoginShow(false);
        navigate("/");
      }
    }
  };

  // Onchange for signup input field
  const handleSignUpInput = (event) => {
    setSignUpState({ ...signupState, [event.target.name]: event.target.value });
  };

  // For signup click
  const handleSignUpClick = async (event) => {
    event.preventDefault();

    const isValidate = SignUpValidate(signupState); // Frontend Signup field Validation
    if (isValidate) {
      const res = await sigupUserApi(signupState); // api call
      if (res.status === 201) {
        toast.success("Registration Successfully");
        setSignupShow(false);
        setNavbarState({ ...navbarstate, login: true });
        navigate("/");
      }
    }
  };

  // For logout click
  const handleLogout = async () => {
    const res = await logout(); // api call
    if (res.status === 200) {
      toast.info("Logged Out");
      setNavbarState({
        ...navbarstate,
        login: false,
      });
      navigate("/");
    }
  };

  // For changing navbar links
  const callNavbar = async () => {
    try {
      const res = await axios.get("/navbar"); // api call
      setNavbarState({
        ...navbarstate,
        login: true,
        user: res.data.rootUser,
      });
    } catch (error) {
      setNavbarState({
        ...navbarstate,
        login: false,
        user: "",
      });
    }
  };

  // Call navbar states when it changes
  useEffect(() => {
    callNavbar();
  }, [navbarstate.login]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="main_nav">
        <Container className="nav_bar">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="LOGO" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="hamburger_button"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto nav_link_container">
              <Nav.Link as={Link} to="/" className="nav_link">
                <div className="nav_link_component">
                  <span>
                    <FaHome />
                  </span>
                  <span>Home</span>
                </div>
              </Nav.Link>
              <Nav.Link
                as={ScrollLink}
                to="about_id"
                smooth={true}
                spy={true}
                duration={500}
                className="nav_link"
              >
                <div className="nav_link_component">
                  <span>
                    <BiUserPin />
                  </span>
                  <span>About</span>
                </div>
              </Nav.Link>
              <Nav.Link
                as={ScrollLink}
                to="education_id"
                smooth={true}
                spy={true}
                duration={500}
                className="nav_link"
              >
                <div className="nav_link_component">
                  <span>
                    <FaUserGraduate />
                  </span>
                  <span>Education</span>
                </div>
              </Nav.Link>

              <Nav.Link as={ScrollLink} to="contact_id" className="nav_link">
                <div className="nav_link_component">
                  <span>
                    <AiFillContacts />
                  </span>
                  <span>Contact</span>
                </div>
              </Nav.Link>
              {navbarstate.login ? (
                <>
                  <Nav.Link className="nav_link">
                    <div className="nav_link_component">
                      <span>{navbarstate.user.name}</span>
                    </div>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav_link">
                    <div className="nav_link_component">
                      <span>
                        <AiOutlineLogout />
                      </span>
                      <span>Logout</span>
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleLoginShow} className="nav_link">
                    <div className="nav_link_component">
                      <span>
                        <AiOutlineLogin />
                      </span>
                      <span>Login</span>
                    </div>
                  </Nav.Link>
                  <Nav.Link onClick={handleSignupShow} className="nav_link">
                    <div className="nav_link_component">
                      <span>
                        <FaUserPlus />
                      </span>
                      <span>Signup</span>
                    </div>
                  </Nav.Link>
                </>
              )}
              <NavDropdown
                title="More"
                id="collasible-nav-dropdown"
                className="dropdown_toggler"
              >
                <NavDropdown.Item
                  as={ScrollLink}
                  to="skills_id"
                  className="dropdown_nav_link"
                >
                  Skills
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  as={ScrollLink}
                  to="projects_id"
                  className="dropdown_nav_link"
                >
                  Latest Projects
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  as={Link}
                  to="/"
                  className="dropdown_nav_link"
                >
                  Experiences
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  as={Link}
                  to="/admin"
                  className="dropdown_nav_link"
                >
                  Admin
                </NavDropdown.Item>

                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Sign Up Modal */}
      <Modal
        show={signupshow}
        onHide={handleSignupClose}
        className="custommodal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="signUpName"
                className="modal_form_control shadow-none"
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="signUpEmail"
                placeholder="Enter email"
                className="modal_form_control shadow-none"
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="signUpPassword"
                placeholder="Password"
                className="modal_form_control shadow-none"
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                name="signUpConfirmPassword"
                placeholder="Confirm Password"
                className="modal_form_control shadow-none"
                onChange={handleSignUpInput}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              className="modal_form_control modal_btn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Login Modal */}
      <Modal show={loginshow} onHide={handleLoginClose} className="custommodal">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="loginEmail"
                placeholder="Enter email"
                className="modal_form_control shadow-none"
                onChange={handleLoginInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="loginPassword"
                placeholder="Password"
                className="modal_form_control shadow-none"
                onChange={handleLoginInput}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              className=" modal_btn"
              onClick={handleLoginClick}
            >
              Login
            </Button>

            <Link
              className="forgot_password_link"
              onClick={() => setLoginShow(false)}
              to={`/password/forgot`}
            >
              Forgot Password ?
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
