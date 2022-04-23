import React, { useEffect, useState } from "react";
import "./Skills.css";
import { Container, Row, Col } from "react-bootstrap";
import { Line } from "rc-progress";
import { getAllSkillsApi } from "../../../api";
const Skills = () => {
  const [skilldata, setSkillData] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      const skills = await getAllSkillsApi();
      setSkillData(skills.data.skills);
    };
    getSkills();
  }, []);

  return (
    <>
      <section id="skills_id">
        <Container>
          <Row>
            <h1 className="skills_heading text-center">Skills</h1>
            {skilldata.map((skill, index) => {
              return (
                <Col xs={10} sm={6}  md={4} lg={3} className="skills_col mx-auto" key={index}>
                  <Line
                    className="skill_progress"
                    percent={`${skill.value}`}
                    strokeWidth="3"
                    trailWidth="1"
                    strokeColor="#FFFFFF"
                    trailColor="#D3D3D3"
                  />

                  <h4>
                    {skill.name}
                    <span>{skill.value}%</span>
                  </h4>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Skills;
