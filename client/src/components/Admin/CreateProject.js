import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";
import { FaImage } from "react-icons/fa";
import { createProjectsApi } from "../../api";
import { toast } from "react-toastify";
import { createProjectValidate } from "../InputFieldValidation/formvalidation";
const CreateProject = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(""); //for file state

  // for projectstate
  const [post, setPost] = useState({
    name: "",
    description: "",
    picture: "",
  });

  // for onchange input
  const inputHandle = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  // for onchange file handle
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


  // for create project
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = createProjectValidate(post);
    if (isValid) {
      const res = await createProjectsApi(post); // api call
      if (res.status === 201) {
        toast.success("Project Created Successfully");
        navigate("/admin");
      }
    }
  };

  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Create Project</h1>
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
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
