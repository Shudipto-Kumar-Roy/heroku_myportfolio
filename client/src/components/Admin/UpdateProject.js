import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProject.css";
import { FaImage } from "react-icons/fa";
import { fetchSingleProject, updateProjectsApi } from "../../api";
import { toast } from "react-toastify";
import { createProjectValidate } from "../InputFieldValidation/formvalidation";
import "./CreateProject.css";
const UpdateProject = () => {
  const { id } = useParams(); // for getting the params id
  const navigate = useNavigate(); // for location path
  const [file, setFile] = useState(""); // for file state

  // For project state
  const [post, setPost] = useState({
    name: "",
    description: "",
    picture: "",
  });

  // For onchange input
  const inputHandle = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  // For onchange file
  const fileHandle = (event) => {
    setFile(event.target.files[0]);
  };

   // Converting normal file to base64string
   const convertToBase64 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPost({ ...post, picture: reader.result });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };
  convertToBase64(file);


  // For update project
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = createProjectValidate(post);
    if (isValid) {
      const res = await updateProjectsApi(id, post); // api call
      if (res.status === 200) {
        toast.success("Project Updated Successfully");
        navigate("/admin");
      }
    }
  };

  useEffect(() => {
    const getProjectData = async () => {
      const project = await fetchSingleProject(id); // api call
      setPost(project.data.project);
    };
    getProjectData();
  }, []);

  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Update Project</h1>
        <form action="" className="create_project_form">
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="name"
              value={post.name}
              onChange={inputHandle}
              placeholder="Enter Project Title"
            />
          </div>
          <div className="create_form_group">
            <textarea
              type="text"
              rows={5}
              name="description"
              value={post.description}
              onChange={inputHandle}
              className="create_form_control"
              placeholder="Enter Project Description"
            ></textarea>
          </div>
          <div className="create_form_group">
            <label htmlFor="form_image" className="create_form_file_icon">
              <FaImage /> Browse Image
            </label>
            <input
              type="file"
              onChange={fileHandle}
              name="picture"
              id="form_image"
            />
          </div>
          <div className="create_form_group">
            <img
              src={post.picture}
              alt="Sample"
              className="create_form_image"
            />
          </div>
          <div className="create_form_group">
            <button
              onClick={handleClick}
              type="button"
              className="create_form_btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;
