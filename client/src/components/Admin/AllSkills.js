import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEducation, deleteSkill, getAllSkillsApi } from "../../api";
import "./AllProjects.css";
const AllSkills = () => {
  const [skillData, setSkillData] = useState([]);
  const [deletestate, setDeleteState] = useState(false);

  useEffect(() => {
    const getSkillData = async () => {
      const skills = await getAllSkillsApi(); //api call
      setSkillData(skills.data.skills);
    };
    getSkillData();
  }, [deletestate]);

  //*********** For admin project card ***********
  const Cards = ({ skills }) => {
    // For delete project
    const handleDelete = async (id) => {
      const isOk = window.confirm("Do you really want to delete?");
      if (isOk) {
        const res = await deleteSkill(id); // api call
        if (res.status === 200) {
          toast.success("Skill Deleted Successfully");
          setDeleteState(true);
        }
      }
    };
    return (
      <>
        {skills.map((skill, index) => {
          return (
            <Col sm={6} md={6} lg={4} className="my-5" key={index}>
              <Card className="admin_project_card">
                <Card.Body>
                  <Card.Title className="admin_project_card_title">
                    Topic
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {skill.name}
                  </Card.Text>
                  <Card.Title className="admin_project_card_title">
                    Efficiency
                  </Card.Title>
                  <Card.Text className="admin_project_card_description">
                    {skill.value}%
                  </Card.Text>
                  <Link to={`/admin/updateskill/${skill._id}`}>
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
                    onClick={() => handleDelete(skill._id)}
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
          <Cards skills={skillData} />
        </Row>
      </Container>
    </>
  );
};

export default AllSkills;
