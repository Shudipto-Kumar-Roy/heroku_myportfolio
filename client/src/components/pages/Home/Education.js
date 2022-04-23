import React, { useEffect, useState } from "react";
import "./Education.css";
import { Col, Container, Row } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getEducationApi } from "../../../api";
const Education = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 2 },
  };

  const [educationData, setEducatioData] = useState([]);
  useEffect(() => {
    const getEducation = async () => {
      const educations = await getEducationApi();
      setEducatioData(educations.data.educations);
    };
    getEducation();
  }, []);

  const items = educationData.map((education, index) => {
    return (
      <div className="education_card" key={index}>
        <div className="education_inner_card">
          <div className="education_card_front">
            <h1>{education.degreeinshort}</h1>
          </div>
          <div className="education_card_back">
            <table>
              <tbody>
                <tr>
                  <th className="text-center">Degree :</th>
                  <td className="text-center">{education.degree}</td>
                </tr>
                <tr>
                  <th className="text-center">Institution : &nbsp;</th>
                  <td className="text-center">{education.institution}</td>
                </tr>
                <tr>
                  <th className="text-center" className="text-center">
                    Result :
                  </th>
                  <td className="text-center" className="text-center">
                    {education.degreeinshort === "SSC" ||
                    education.degreeinshort === "HSC"
                      ? `GPA ${education.result} / 5.00 scale`
                      : `CGPA ${education.result} / 4.00 scale`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <section id="education_id" className="eduction">
        <Container>
          <Row>
            <h1 className="text-center education_heading">Education</h1>
            <Col xs={12} className="mx-auto">
              <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                autoPlay={true}
                infinite={true}
                keyboardNavigation={true}
                autoPlayControls={window.innerWidth < 769 ? false : true}
                animationType="slide"
                animationDuration={1000}
                disableButtonsControls={true}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Education;
