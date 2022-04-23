import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { validateSkillField } from "../InputFieldValidation/formvalidation";
import "./CreateProject.css";
import { fetchSingleSkill, updateSkillApi } from "../../api";
const UpdateSkill = () => {
  const navigate = useNavigate();
  const {id} = useParams();
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
      const res = await updateSkillApi(id,skillstate); // api call
      if (res.status === 200) {
        toast.success("Skill Updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSkillState({ name: "", value: "" });
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const getSkillData = async () => {
      const skill = await fetchSingleSkill(id); // api call
      setSkillState(skill.data.skill);
    };
    getSkillData();
  }, []);

  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Update Skill</h1>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateSkill;
