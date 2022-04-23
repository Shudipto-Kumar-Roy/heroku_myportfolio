import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateEducationField } from "../InputFieldValidation/formvalidation";
import "./CreateProject.css";
import { createEducationApi } from "../../api";
const CreateEducation = () => {
  const navigate = useNavigate();
  const [educationstate, setEducationState] = useState({
    degreeinshort: "",
    degree: "",
    institution: "",
    result: "",
  });
  const inputHandle = (event) => {
    setEducationState({
      ...educationstate,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateEducationField(educationstate);
    if (isValid) {
      const res = await createEducationApi(educationstate); // api call
      console.log(res.status);
      if (res.status === 201) {
        toast.success("Education Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEducationState({
          degree: "",
          institution: "",
          result: "",
        });
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Create Education</h1>
        <form action="" className="create_project_form">
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="degreeinshort"
              value={educationstate.degreeinshort}
              onChange={inputHandle}
              placeholder="Enter Degree In Short Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="degree"
              value={educationstate.degree}
              onChange={inputHandle}
              placeholder="Enter Degree Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="institution"
              value={educationstate.institution}
              onChange={inputHandle}
              placeholder="Enter Institution Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="result"
              value={educationstate.result}
              onChange={inputHandle}
              placeholder="Enter Result"
            />
          </div>

          <div className="create_form_group">
            <button
              onClick={handleClick}
              type="button"
              className="create_form_btn"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEducation;
