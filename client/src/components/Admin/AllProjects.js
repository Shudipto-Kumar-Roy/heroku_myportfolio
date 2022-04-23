import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { delteProject, fetchProjectData } from "../../api";
import "./AllProjects.css";
const AllProjects = () => {
  const [projectData, setProjectData] = useState([]);
  const [deletestate, setDeleteState] = useState(false);

  useEffect(() => {
    const getProjectData = async () => {
      const projects = await fetchProjectData(); //api call
      setProjectData(projects.data.projects);
    };
    getProjectData();
  }, [deletestate]);

  //*********** For admin project card ***********
  const Cards = ({ projects }) => {
    // For delete project
    const handleDelete = async (id) => {
      const isOk = window.confirm("Do you really want to delete?");
      if (isOk) {
        const res = await delteProject(id); // api call
        if (res.status === 200) {
          toast.success("Project Deleted Successfull", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setDeleteState(true);
        }
      }
    };
    return (
      <>
        {projects.map((project, index) => {
          return (
            <Col sm={6} md={6} lg={4} className="my-5" key={index}>
              <Card className="admin_project_card">
                <Card.Img
                  variant="top"
                  src={project.picture}
                  className="admin_project_card_image"
                />
                <Card.Body>
                  <Card.Title className="admin_project_card_title">
                    {project.name}
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {project.description}
                  </Card.Text>
                  <Link to={`/admin/updateproject/${project._id}`}>
                    <Button
                      variant="primary"
                      className="mx-1 admin_project_card_btn"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-1 admin_project_card_btn"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Cards projects={projectData} />
        </Row>
      </Container>
    </>
  );
};

export default AllProjects;
