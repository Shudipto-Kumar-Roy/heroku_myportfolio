import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEducation, getEducationApi } from "../../api";
import "./AllProjects.css";
const AllEducations = () => {
  const [educationData, setEducationData] = useState([]);
  const [deletestate, setDeleteState] = useState(false);

  useEffect(() => {
    const getEducationData = async () => {
      const educations = await getEducationApi(); //api call
      setEducationData(educations.data.educations);
    };
    getEducationData();
  }, [deletestate]);

  //*********** For admin project card ***********
  const Cards = ({ educations }) => {
    // For delete project
    const handleDelete = async (id) => {
      const isOk = window.confirm("Do you really want to delete?");
      if (isOk) {
        const res = await deleteEducation(id); // api call
        if (res.status === 200) {
          toast.success("Education Deleted Successfully", {
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
        {educations.map((education, index) => {
          return (
            <Col sm={6} md={6} lg={4} className="my-5" key={index}>
              <Card className="admin_project_card">
                <Card.Body>
                  <Card.Title className="admin_project_card_title">
                    Degree
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {education.degree}
                  </Card.Text>
                  <Card.Title className="admin_project_card_title">
                    Institution
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {education.institution}
                  </Card.Text>
                  <Card.Title className="admin_project_card_title">
                    Result
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {education.result}
                  </Card.Text>
                  <Link to={`/admin/updateeducation/${education._id}`}>
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
                    onClick={() => handleDelete(education._id)}
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
          <Cards educations={educationData} />
        </Row>
      </Container>
    </>
  );
};

export default AllEducations;
