import React from "react";
import "./Projects.css";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCaresoul from "../../ProjectCaresoul";
const Porjects = () => {
  return (
    <>
      <section id="projects_id">
        <Container>
          <Row className="text-center">
            <h1 className="projects_heading">Latest Projects</h1>
            <Col md={12} className="projects_col">
              <ProjectCaresoul />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Porjects;
