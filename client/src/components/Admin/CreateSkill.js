import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateSkillField } from "../InputFieldValidation/formvalidation";
import "./CreateProject.css";
import { createSkillApi } from "../../api";
const CreateSkill = () => {
  const navigate = useNavigate();
  const [skillstate, setSkillState] = useState({
    name: "",
    value: "",
  });
  const inputHandle = (event) => {
    setSkillState({ ...skillstate, [event.target.name]: event.target.value });
  };
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateSkillField(skillstate);
    if (isValid) {
      const res = await createSkillApi(skillstate); // api call
      if (res.status === 201) {
        toast.success("Skill Created Successfully");
        setSkillState({ name: "", value: "" });
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Create Skill</h1>
        <form action="" className="create_project_form">
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="name"
              value={skillstate.name}
              onChange={inputHandle}
              placeholder="Enter Skill Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="number"
              className="create_form_control"
              name="value"
              min={1}
              max={100}
              value={skillstate.value}
              onChange={inputHandle}
              placeholder="Enter Skill Value"
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

export default CreateSkill;
