import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectCaresoul.css";
import { fetchProjectData } from "../api";
import { Link } from "react-router-dom";

const ProjectCaresoul = () => {
  const [projectData, setProjectData] = useState([]);
  useEffect(() => {
    const getProjectData = async () => {
      const res = await fetchProjectData();
      if (res.status === 200) {
        setProjectData(res.data.projects);
      }
    };
    getProjectData();
  }, []);

  return (
    <Slider
      dots={true}
      pauseOnHover={true}
      autoplay={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {projectData.map((project, index) => {
        const createdate = new Date(project.createdAt).toLocaleString();
        const updatedate = new Date(project.updatedAt).toLocaleString();
        return (
          <div className="caresoul_conatainer" key={index}>
            <div className="caresoul_image">
              <img
                src={project.picture}
                className="img-fluid"
                alt="CaresoulImage"
              />
            </div>
            <div className="carsoul_content">
              <h1>{project.name}</h1>
              <p>{project.description}</p>
              <a href={`${project.link ? project.link : "/"}`} target="_blank">Live Demo</a>
              <h6>Created : {createdate}</h6>
              <h6>Updated : {updatedate}</h6>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default ProjectCaresoul;
