import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./AdminScreen.css";
import { toast } from "react-toastify";

export const AdminScreen = () => {
  const navigate = useNavigate(); // for path location

  // Call admin page
  const callAdminPage = async () => {
    try {
      const res = await axios.get("/admin");
      if (res.data.rootUser.userRole !== "admin") {
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.info(`Only admin can access the link`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      } else {
        toast.info(`Getting User Data Failed ${error}`, {
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

  // Call admin page
  useEffect(() => {
    callAdminPage();
  }, []);
  return (
    <>
      <section id="adminscreen_id" className="admin">
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="admin_heading text-center">Admin Panel</h1>
            </Col>
          </Row>
          <Row>
            <Col md={3} xs={12} className="admin_col mx-auto">
              <div className="admin_nav_button">
                <Link to={`/admin`} className="nav_link_admin">
                  AllProjects
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/allskills`} className="nav_link_admin">
                  AllSkills
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/alleducations`} className="nav_link_admin">
                  AllEducation
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/createproject`} className="nav_link_admin">
                  Create Project
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/createskills`} className="nav_link_admin">
                  Create Skills
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/createeducation`} className="nav_link_admin">
                  Create Education
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin/uploadresume`} className="nav_link_admin">
                  Upload Resume
                </Link>
              </div>
              <div className="admin_nav_button">
                <Link to={`/admin`} className="nav_link_admin">
                  All Users
                </Link>
              </div>
            </Col>
            <Col md={9} xs={12} className="admin_col">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
