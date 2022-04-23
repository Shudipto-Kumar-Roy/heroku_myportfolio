import React, { useEffect, useState } from "react";
import "./About.css";
import { Container, Row, Col } from "react-bootstrap";
import image from "../../../images/about.png";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-scroll";
import { toast } from "react-toastify";
import { getPdfFileApi } from "../../../api";


const About = () => {
  const [pdf, setPdf] = useState("");
  useEffect(() => {
    const getPdfFile = async () => {
      const res = await getPdfFileApi();
      if (res.status === 200) {
        setPdf(res.data.file.file);
      }
    };
    getPdfFile();
  }, []);

  return (
    <>
      <section className="about" id="about_id">
        <Container>
          <Row>
            <Col md={3} xs={10} className="about_col mx-auto">
              <img
                src={image}
                alt="About"
                className="about_image img-fluid mx-auto"
              />
            </Col>
            <Col md={9} xs={10} className="about_col mx-auto">
              <h1>About Me</h1>
              <h4>Developer & Designer</h4>
              <p>
                I'm a full stack web developer. I use the best MERN stack to
                develop fontend as well as backend. I can provide clean code and
                pixel perfect design. A responsive design makes your websites
                accessible to all users, regardless of their device.
              </p>
              <div>
                <Link to="contact_id" smooth={true} spy={true} duration={1000}>
                  <button>Let't Talk</button>
                </Link>
                <a href={pdf} target="_blank">
                  <button>
                    Download CV
                    <AiOutlineCaretDown />
                  </button>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
